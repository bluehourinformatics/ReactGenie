import PromptInput from "@/components/dashboard/prompt-input";
import RecentProjects from "@/components/dashboard/recent-projects";
import UsageStats from "@/components/dashboard/usage-stats";
import { Sparkles } from "lucide-react";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="mx-auto space-y-8 max-w-6xl">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Build apps with AI
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Describe your app idea and let AI handle the rest. No coding required.
        </p>
      </div>
      <PromptInput />
      <UsageStats />
      <RecentProjects />
    </div>
  );
}
