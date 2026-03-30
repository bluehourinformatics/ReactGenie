export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// ─── Model cost multipliers (credits per estimated token) ───────────────────
export const MODEL_MULTIPLIERS: Record<string, number> = {
  // OpenAI
  "openai/gpt-4o": 5,
  "openai/gpt-4o-mini": 2,
  "openai/gpt-4-turbo": 5,
  "openai/gpt-3.5-turbo": 1,
  // Anthropic
  "anthropic/claude-opus-4": 4,
  "anthropic/claude-sonnet-4-5": 4,
  "anthropic/claude-haiku-4-5": 2,
  // DeepSeek
  "deepseek/deepseek-chat": 1,
  "deepseek/deepseek-r1": 1,
  // Meta
  "meta-llama/llama-3.3-70b-instruct": 1,
  "meta-llama/llama-3.1-8b-instruct": 1,
  // Google
  "google/gemini-2.5-pro": 3,
  "google/gemini-2.0-flash-001": 2,
};

const DEFAULT_MULTIPLIER = 2;
const CHARS_PER_TOKEN = 4;

/**
 * Estimates credits required for a request.
 * credits = estimatedTokens * multiplier
 */
export function estimateCredits(
  messages: ChatMessage[],
  model: string,
): number {
  const totalChars = messages.reduce((sum, m) => sum + m.content.length, 0);
  const estimatedTokens = Math.ceil(totalChars / CHARS_PER_TOKEN);
  const multiplier = MODEL_MULTIPLIERS[model] ?? DEFAULT_MULTIPLIER;
  return Math.max(1, Math.ceil(estimatedTokens * multiplier));
}

/**
 * Calculates actual credit cost from real token usage.
 */
export function calculateActualCredits(tokens: number, model: string): number {
  const multiplier = MODEL_MULTIPLIERS[model] ?? DEFAULT_MULTIPLIER;
  return Math.max(1, Math.ceil(tokens * multiplier));
}

/**
 * Parses a raw SSE line and returns the delta content string, or:
 *   null  → skip (keep-alive, empty, non-data line)
 *   false → stream done ([DONE] sentinel)
 */
export function parseSSELine(line: string): string | null | false {
  if (!line.startsWith("data: ")) return null;

  const data = line.slice(6).trim();
  if (data === "[DONE]") return false;

  try {
    const json = JSON.parse(data);
    const content: string | undefined = json?.choices?.[0]?.delta?.content;
    return content ?? null;
  } catch {
    return null;
  }
}

/**
 * Consumes a ReadableStream<Uint8Array> from the OpenRouter SSE response and
 * yields decoded content chunks one at a time.
 */
export async function* streamSSEContent(
  body: ReadableStream<Uint8Array>,
): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      // Keep last (potentially incomplete) line in buffer
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const result = parseSSELine(line.trimEnd());
        if (result === false) return; // [DONE]
        if (typeof result === "string") yield result;
      }
    }

    // Flush remaining buffer
    if (buffer) {
      const result = parseSSELine(buffer.trimEnd());
      if (typeof result === "string") yield result;
    }
  } finally {
    reader.releaseLock();
  }
}
