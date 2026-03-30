import type { ChatMessage } from "./helpers";

export interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  onDone: (fullText: string) => void;
  onError: (err: Error) => void;
}

/**
 * Calls POST /api/chat and streams the response text via callbacks.
 *
 * Usage:
 *   await streamChat({ messages, model }, {
 *     onChunk: (t) => setResponse(r => r + t),
 *     onDone:  (full) => console.log("done", full),
 *     onError: (e) => console.error(e),
 *   });
 */
export async function streamChat(
  { messages, model }: { messages: ChatMessage[]; model: string },
  { onChunk, onDone, onError }: StreamCallbacks,
): Promise<void> {
  let fullText = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, model }),
    });

    if (!res.ok) {
      const { error } = await res
        .json()
        .catch(() => ({ error: res.statusText }));
      throw new Error(error ?? `HTTP ${res.status}`);
    }

    if (!res.body) throw new Error("No response body");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      // Surface stream-level errors embedded by the server
      if (chunk.startsWith("\n[ERROR]:")) {
        throw new Error(chunk.replace("\n[ERROR]: ", "").trim());
      }

      fullText += chunk;
      onChunk(chunk);
    }

    onDone(fullText);
  } catch (err) {
    onError(err instanceof Error ? err : new Error(String(err)));
  }
}

// ── Minimal usage example (no UI) ──────────────────────────────────────────
// import { streamChat } from "@/lib/openrouter/client";
//
// const messages: ChatMessage[] = [
//   { role: "system", content: "You are a helpful assistant." },
//   { role: "user",   content: "Explain RSA encryption in one paragraph." },
// ];
//
// await streamChat(
//   { messages, model: "openai/gpt-4o" },
//   {
//     onChunk: (t) => process.stdout.write(t),
//     onDone:  (full) => console.log("\n\nDone. Total chars:", full.length),
//     onError: (e)    => console.error("Stream error:", e.message),
//   }
// );
