"use client";

import { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const viewports = [
  { id: "desktop", icon: Monitor, width: "100%" },
  { id: "tablet", icon: Tablet, width: "768px" },
  { id: "mobile", icon: Smartphone, width: "375px" },
];

export default function PreviewPanel() {
  const [viewport, setViewport] = useState("desktop");
  const [refreshKey, setRefreshKey] = useState(0);

  const currentViewport = viewports.find((v) => v.id === viewport);

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="font-semibold">Live Preview</h2>
        <div className="flex items-center gap-2">
          <Tabs value={viewport} onValueChange={setViewport}>
            <TabsList className="h-8">
              {viewports.map((vp) => (
                <TabsTrigger key={vp.id} value={vp.id} className="px-2">
                  <vp.icon className="h-4 w-4" />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="h-4 w-px bg-border" />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setRefreshKey((k) => k + 1)}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex flex-1 items-center justify-center overflow-auto bg-secondary/50 p-4">
        <div
          key={refreshKey}
          className={cn(
            "h-full overflow-hidden rounded-lg border border-border bg-background shadow-lg transition-all duration-300",
            viewport === "desktop" && "w-full",
            viewport === "tablet" && "w-3xl max-w-full",
            viewport === "mobile" && "w-93 max-w-full",
          )}
        >
          {/* Mock Preview Content */}
          <div className="h-full overflow-auto">
            <div className="min-h-full bg-background">
              {/* Mock Header */}
              <header className="border-b border-border px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary" />
                    <span className="font-semibold">My App</span>
                  </div>
                  <nav className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                      Features
                    </span>
                    <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                      Pricing
                    </span>
                    <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                      About
                    </span>
                    <Button size="sm">Get Started</Button>
                  </nav>
                </div>
              </header>

              {/* Mock Hero Section */}
              <section className="px-6 py-16 text-center">
                <h1 className="text-4xl font-bold tracking-tight">
                  Build Something Amazing
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                  Create beautiful applications with the power of AI. No coding
                  experience required.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button size="lg">Start Building</Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </section>

              {/* Mock Features Grid */}
              <section className="px-6 py-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-card p-6"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <div className="h-5 w-5 rounded bg-primary" />
                      </div>
                      <h3 className="font-semibold">Feature {i}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        A brief description of this amazing feature and how it
                        helps users.
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
