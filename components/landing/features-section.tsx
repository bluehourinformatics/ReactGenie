import { Sparkles, Code2, Layers, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    name: "Unified Provider API",
    description:
      "Switch between AI providers by changing a single line of code. Support for OpenAI, Anthropic, Google, and more.",
    icon: Layers,
  },
  {
    name: "Generative UI",
    description:
      "Create dynamic, AI-powered user interfaces that amaze your users. Build interactive components with natural language.",
    icon: Sparkles,
  },
  {
    name: "Framework-agnostic",
    description:
      "Build with React, Next.js, Vue, Nuxt, SvelteKit, and more. Works with any modern JavaScript framework.",
    icon: Code2,
  },
  {
    name: "Streaming Responses",
    description:
      "Don&apos;t let your users wait for AI responses. Send them instantly with built-in streaming support.",
    icon: Zap,
  },
  {
    name: "Enterprise Security",
    description:
      "SOC 2 compliant with end-to-end encryption. Your data stays private and secure at all times.",
    icon: Shield,
  },
  {
    name: "Edge Deployment",
    description:
      "Deploy globally with edge functions. Low latency responses from anywhere in the world.",
    icon: Globe,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">
            Everything you need
          </p>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Build faster with AI-powered tools
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            A complete toolkit for building production-ready AI applications.
            From prototype to deployment in minutes.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:bg-secondary/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
