import { CheckCircle2 } from "lucide-react";

const stats = [
  { value: "10x", label: "Faster development" },
  { value: "98%", label: "Time to market reduction" },
  { value: "50K+", label: "Apps built" },
  { value: "99.9%", label: "Uptime SLA" },
];

const benefits = [
  "Natural language to production code",
  "Real-time collaboration",
  "Version control built-in",
  "One-click deployment",
  "Automatic testing",
  "Performance monitoring",
];

export function ShowcaseSection() {
  return (
    <section
      id="showcase"
      className="border-t border-border bg-secondary/30 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Stats */}
          <div>
            <p className="text-sm font-semibold text-primary">Why BuilderAI</p>
            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Faster iteration.
              <br />
              More innovation.
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              The platform for rapid progress. Let your team focus on shipping
              features instead of managing infrastructure with automated CI/CD,
              built-in testing, and integrated collaboration.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-l-2 border-primary pl-4"
                >
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Benefits */}
          <div className="flex items-center">
            <div className="rounded-xl border border-border bg-card p-8 lg:p-10">
              <h3 className="text-xl font-semibold text-foreground">
                Make teamwork seamless
              </h3>
              <p className="mt-2 text-muted-foreground">
                Tools for your team and stakeholders to share feedback and
                iterate faster.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
