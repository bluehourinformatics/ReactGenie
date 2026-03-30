export default function LogoCloud() {
  const logos = [
    { name: "Acme Corp", text: "ACME" },
    { name: "Globex", text: "GLOBEX" },
    { name: "Initech", text: "INITECH" },
    { name: "Umbrella", text: "UMBRELLA" },
    { name: "Massive", text: "MASSIVE" },
    { name: "Hooli", text: "HOOLI" },
  ];

  return (
    <section className="border-y border-border bg-secondary/30 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground">
          Trusted by builders at
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="text-xl font-bold tracking-tight text-muted-foreground/60 transition-colors hover:text-muted-foreground"
            >
              {logo.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
