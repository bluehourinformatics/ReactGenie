import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-16 lg:py-24">
          {/* Background pattern */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          </div>

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>

          <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to build something amazing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-primary-foreground/80">
            Join thousands of developers who are already building the future
            with AI. Start for free, no credit card required.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              <Link href="/">
                Start Building
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/billing">View Pricing</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/60">
            Free tier includes 1000 monthly credits. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
