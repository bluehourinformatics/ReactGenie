"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Check, Copy, Play } from "lucide-react";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx create-builderai@latest");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-125 w-200 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Announcement badge */}
        <div className="flex justify-center">
          <Link
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            BuilderAI 2.0 is now available
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Main heading */}
        <div className="mt-10 text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            The AI Toolkit for
            <br />
            <span className="text-primary">Building Apps</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
            From idea to production in minutes. BuilderAI is the open-source
            platform that gives you the tools to build AI-powered applications
            with just a prompt.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild className="gap-2">
            <Link href="/">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <button
            onClick={handleCopy}
            className="group flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:bg-secondary"
          >
            <span className="text-muted-foreground">$</span>
            <span>npx create-builderai@latest</span>
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            )}
          </button>
          <Button size="lg" variant="outline" asChild className="gap-2">
            <Link href="#">
              <Play className="h-4 w-4" />
              Watch Demo
            </Link>
          </Button>
        </div>

        {/* Hero visual */}
        <div className="mt-16 lg:mt-20">
          <div className="relative mx-auto max-w-5xl">
            {/* Browser frame */}
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
              {/* Browser header */}
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground">
                    <span>builderai.app</span>
                  </div>
                </div>
              </div>

              {/* Content preview */}
              <div className="grid lg:grid-cols-2">
                {/* Chat side */}
                <div className="border-r border-border p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                        U
                      </div>
                      <div className="rounded-lg bg-secondary px-4 py-2.5 text-sm">
                        Create a signup modal with a form. When submitting the
                        form, show a success toast.
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                        AI
                      </div>
                      <div className="space-y-2">
                        <div className="rounded-lg bg-secondary/50 px-4 py-2.5 text-sm text-muted-foreground">
                          {
                            "I'll create a modal that contains a form, and show a toast when the contents have been submitted. I'll use shadcn/ui, React and Tailwind:"
                          }
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                          <div className="h-8 w-8 rounded bg-muted animate-pulse" />
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              Modal with Form
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Generating...
                            </div>
                          </div>
                          <div className="ml-auto text-xs text-muted-foreground">
                            v1
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code side */}
                <div className="bg-[#0d0d0d] p-6 font-mono text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <span className="text-foreground">Preview</span>
                    <span className="border-b-2 border-primary text-primary pb-1">
                      modal.tsx
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-blue-400">{`'use client'`}</span>
                    </div>
                    <div className="h-2" />
                    <div>
                      <span className="text-purple-400">import</span>{" "}
                      <span className="text-foreground">
                        {"{ useFormStatus }"}
                      </span>{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-green-400">{`"react-dom"`}</span>
                    </div>
                    <div>
                      <span className="text-purple-400">import</span>{" "}
                      <span className="text-foreground">{"{ Button }"}</span>{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-green-400">{`"@/components/ui/button"`}</span>
                    </div>
                    <div>
                      <span className="text-purple-400">import</span>{" "}
                      <span className="text-foreground">{"{ Input }"}</span>{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-green-400">{`"@/components/ui/input"`}</span>
                    </div>
                    <div>
                      <span className="text-purple-400">import</span>{" "}
                      <span className="text-foreground">{"{ Label }"}</span>{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-green-400">{`"@/components/ui/label"`}</span>
                    </div>
                    <div className="h-2" />
                    <div>
                      <span className="text-purple-400">function</span>{" "}
                      <span className="text-yellow-400">SubmitButton</span>
                      <span className="text-foreground">{"() {"}</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-foreground">{"{ pending }"}</span>{" "}
                      <span className="text-purple-400">=</span>{" "}
                      <span className="text-yellow-400">useFormStatus</span>
                      <span className="text-foreground">()</span>
                    </div>
                    <div className="pl-4">
                      <span className="text-purple-400">return</span>{" "}
                      <span className="text-foreground">(</span>
                    </div>
                    <div className="pl-8">
                      <span className="text-foreground">{"<"}</span>
                      <span className="text-blue-400">Button</span>{" "}
                      <span className="text-cyan-400">type</span>
                      <span className="text-foreground">=</span>
                      <span className="text-green-400">{`"submit"`}</span>
                      <span className="text-foreground">{">"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
