import {
  calculateActualCredits,
  ChatMessage,
  estimateCredits,
  streamSSEContent,
} from "@/lib/openrouter/helpers";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function POST(req: NextRequest) {
  // ── 1. Auth ────────────────────────────────────────────────────────────────
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  // ── 2. Parse body ──────────────────────────────────────────────────────────
  let messages: ChatMessage[];
  let model: string;

  try {
    const body = await req.json();
    messages = body.messages;
    model = body.model;
    if (!Array.isArray(messages) || !model) throw new Error();
  } catch {
    return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
  }

  // ── 3. Fetch user + billing ────────────────────────────────────────────────
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { billingPlan: true },
  });

  if (!user) {
    return NextResponse.json({ error: "USER_NOT_FOUND" }, { status: 404 });
  }
  if (!user.billingPlan) {
    return NextResponse.json({ error: "NO_BILLING_PLAN" }, { status: 402 });
  }

  // ── 4. Credit pre-check ────────────────────────────────────────────────────
  const estimatedCost = estimateCredits(messages, model);
  if (user.billingPlan.credits < estimatedCost) {
    return NextResponse.json(
      { error: "INSUFFICIENT_CREDITS" },
      { status: 402 },
    );
  }

  // ── 5. Call OpenRouter ─────────────────────────────────────────────────────
  const upstreamRes = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-Title": process.env.NEXT_PUBLIC_APP_NAME ?? "My AI App",
    },
    body: JSON.stringify({ model, messages, stream: true }),
  });

  if (!upstreamRes.ok || !upstreamRes.body) {
    const errText = await upstreamRes.text().catch(() => "");
    return NextResponse.json(
      { error: `OPENROUTER_ERROR: ${upstreamRes.status}`, detail: errText },
      { status: 502 },
    );
  }

  // ── 6. Build streaming response with post-completion hook ──────────────────
  const encoder = new TextEncoder();
  let totalContent = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamSSEContent(upstreamRes.body!)) {
          totalContent += chunk;
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "STREAM_FAILURE";
        controller.enqueue(encoder.encode(`\n[ERROR]: ${msg}`));
      } finally {
        controller.close();

        // ── 7. Post-completion: atomic credit deduction + usage log ──────────
        try {
          const totalTokens = Math.ceil(totalContent.length / 4);
          const actualCost = calculateActualCredits(totalTokens, model);

          await prisma.$transaction([
            prisma.billingPlan.update({
              where: { userId: user.id },
              data: { credits: { decrement: actualCost } },
            }),
            prisma.usageRecord.create({
              data: {
                userId: user.id,
                type: "TOKENS",
                tokensUsed: totalTokens,
                periodStart: new Date(),
                periodEnd: new Date(),
              },
            }),
          ]);
        } catch (dbErr) {
          // Log server-side; do not surface to client after stream is closed
          console.error("[sendMessage] post-completion DB error:", dbErr);
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    },
  });
}
