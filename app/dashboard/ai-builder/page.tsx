import AIBuilderContent from "@/components/ai-builder/ai-builder-content";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

export default function AIBuilderPage() {
  return (
    <Suspense fallback={<AIBuilderSkeleton />}>
      <AIBuilderContent />
    </Suspense>
  );
}

function AIBuilderSkeleton() {
  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <div className="flex w-1/2 flex-col">
        <Skeleton className="h-full rounded-lg" />
      </div>
      <div className="w-1/2">
        <Skeleton className="h-full rounded-lg" />
      </div>
    </div>
  );
}
