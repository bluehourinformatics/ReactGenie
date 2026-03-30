"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const suggestions = [
  "Build a task management app with drag-and-drop",
  "Create a social media dashboard",
  "Design a landing page for a SaaS product",
  "Make a real-time chat application",
];

export default function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  function handleGenerate(event: React.MouseEvent<HTMLButtonElement>): void {
    if (prompt.trim()) {
      router.push(`/ai-builder?prompt=${encodeURIComponent(prompt)}`);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Describe the app you want to build..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-32 resize-none bg-secondary pr-4 text-base"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setPrompt(suggestion)}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim()}
            className="gap-2"
            size="lg"
          >
            <Sparkles className="h-4 w-4" />
            Generate App
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
