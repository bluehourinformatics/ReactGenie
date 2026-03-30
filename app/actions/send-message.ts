"use server";

import { auth } from "@clerk/nextjs/server";
import {
  estimateCredits,
  calculateActualCredits,
  streamSSEContent,
  type ChatMessage,
} from "@/lib/openrouter/helpers";
import prisma from "@/lib/prisma";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface SendMessageParams {
  messages: ChatMessage[];
  model: string;
}

/**
 * sendMessage — Server Action
 *
 * Returns a ReadableStream<Uint8Array> suitable for passing directly to a
 * Next.js Response or consumed client-side via fetch + getReader().
 */
export async function sendMessage({
  messages,
  model,
}: SendMessageParams): Promise<ReadableStream<Uint8Array>> {
  // ── 1. Auth ────────────────────────────────────────────────────────────────
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("UNAUTHORIZED");

  // ── 2. Fetch user + billing plan ──────────────────────────────────────────
  const user = await prisma.user.findUnique({
    where: { clerkId },
    include: { billingPlan: true },
  });

  if (!user) throw new Error("USER_NOT_FOUND");
  if (!user.billingPlan) throw new Error("NO_BILLING_PLAN");

  // ── 3. Pre-flight credit check ────────────────────────────────────────────
  const estimatedCost = estimateCredits(messages, model);
  if (user.billingPlan.credits < estimatedCost) {
    throw new Error("INSUFFICIENT_CREDITS");
  }

  // ── 4. Call OpenRouter ────────────────────────────────────────────────────
  const upstreamRes = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer":
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-Title": process.env.NEXT_PUBLIC_APP_NAME ?? "My AI App",
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  });

  if (!upstreamRes.ok) {
    const errText = await upstreamRes.text().catch(() => "unknown error");
    throw new Error(`OPENROUTER_ERROR: ${upstreamRes.status} — ${errText}`);
  }

  if (!upstreamRes.body) {
    throw new Error("OPENROUTER_NO_BODY");
  }

  // ── 5. Build a pass-through stream that also handles post-completion work ─
  const encoder = new TextEncoder();
  let totalContent = "";

  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();

  // Run the streaming + post-completion logic in the background
  (async () => {
    try {
      for await (const chunk of streamSSEContent(upstreamRes.body!)) {
        totalContent += chunk;
        await writer.write(encoder.encode(chunk));
      }

      // ── 6. Post-completion: deduct credits atomically ─────────────────────
      const totalTokens = Math.ceil(totalContent.length / 4); // approx
      const actualCost = calculateActualCredits(totalTokens, model);

      await prisma.$transaction([
        // Deduct from billing plan
        prisma.billingPlan.update({
          where: { userId: user.id },
          data: { credits: { decrement: actualCost } },
        }),
        // Store usage log
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

      // Also log to AIBuilderSession if a projectId is available via context
      // (extend params to include projectId if needed)

      await writer.close();
    } catch (err) {
      const message = err instanceof Error ? err.message : "STREAM_ERROR";
      await writer
        .write(encoder.encode(`\n[ERROR]: ${message}`))
        .catch(() => {});
      await writer.abort(err).catch(() => {});
    }
  })();

  return readable;
}
