"use client";

import { useState, useRef, useEffect } from "react";
import { Send, RefreshCw, User, Bot, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Message } from "./ai-builder-content";

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  onRegenerate: () => void;
}

export default function ChatPanel({
  messages,
  onSendMessage,
  onRegenerate,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleSubmit(): void {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold">AI Assistant</h2>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRegenerate}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </Button>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Start a conversation</h3>
                <p className="text-sm text-muted-foreground">
                  Describe what you want to build
                </p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to build..."
            className="min-h-20 resize-none bg-secondary pr-12"
          />
          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="absolute bottom-3 right-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse code blocks
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const lines = part.slice(3, -3).split("\n");
        const language = lines[0] || "code";
        const code = lines.slice(1).join("\n");
        return (
          <div
            key={index}
            className="my-3 overflow-hidden rounded-lg border border-border"
          >
            <div className="flex items-center justify-between bg-secondary px-4 py-2">
              <span className="text-xs text-muted-foreground">{language}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyCode(code)}
                className="h-7 gap-1.5 px-2"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <pre className="overflow-x-auto bg-background p-4">
              <code className="text-sm">{code}</code>
            </pre>
          </div>
        );
      }
      return (
        <span key={index} className="whitespace-pre-wrap">
          {part}
        </span>
      );
    });
  };

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary" : "bg-secondary",
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-primary-foreground" />
        ) : (
          <Bot className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div
        className={cn(
          "flex-1 rounded-lg px-4 py-3",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary",
        )}
      >
        <div className="text-sm">{renderContent(message.content)}</div>
      </div>
    </div>
  );
}
