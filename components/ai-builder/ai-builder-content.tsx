"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import ChatPanel from "./chat-panel";
import PreviewPanel from "./preview-panel";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIBuilderContent() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") || "";
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (initialPrompt && messages.length === 0) {
      // Add initial user message and simulate AI response
      const userMessage: Message = {
        id: "1",
        role: "user",
        content: initialPrompt,
        timestamp: new Date(),
      };

      const aiResponse: Message = {
        id: "2",
        role: "assistant",
        content: `I'll help you build "${initialPrompt}". Let me generate the initial structure for you.\n\nHere's what I'm creating:\n\n\`\`\`tsx\n// App.tsx\nimport { useState } from 'react'\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-gray-900">\n      <header className="border-b border-gray-800 px-6 py-4">\n        <h1 className="text-xl font-bold">My App</h1>\n      </header>\n      <main className="p-6">\n        {/* Your content here */}\n      </main>\n    </div>\n  )\n}\n\`\`\`\n\nThe basic structure is ready! What would you like me to add next?`,
        timestamp: new Date(),
      };
      setMessages([userMessage, aiResponse]);
    }
  }, [initialPrompt, messages.length]);
  function handleSendMessage(content: string): void {
    throw new Error("Function not implemented.");
  }

  function handleRegenerate(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      <ResizablePanelGroup className="h-full rounded-lg border border-border">
        <ResizablePanel defaultSize={50} minSize={30}>
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            onRegenerate={handleRegenerate}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <PreviewPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
