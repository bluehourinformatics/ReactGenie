"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out BuildAI",
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: "100 credits/month",
    features: [
      "Up to 3 projects",
      "Basic AI generation",
      "Community support",
      "Export to ZIP",
      "Public templates",
    ],
    buttonText: "Get Started Free",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For serious builders and small teams",
    monthlyPrice: 29,
    yearlyPrice: 290,
    credits: "1,000 credits/month",
    features: [
      "Unlimited projects",
      "Advanced AI models",
      "Priority support",
      "One-click deploy",
      "Custom domains",
      "Private templates",
      "Version history",
      "Collaboration (3 members)",
    ],
    buttonText: "Start Pro Trial",
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    description: "For growing teams and organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    credits: "5,000 credits/month",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO authentication",
      "Custom AI training",
      "API access",
      "Dedicated support",
      "SLA guarantee",
      "Advanced analytics",
    ],
    buttonText: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose the perfect plan for your needs. Start free and scale as you
            grow.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <span
              className={cn(
                "text-sm",
                !isYearly && "text-foreground font-medium",
              )}
            >
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span
              className={cn(
                "text-sm",
                isYearly && "text-foreground font-medium",
              )}
            >
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            )}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col border-border bg-card",
                plan.highlighted &&
                  "border-primary shadow-lg shadow-primary/10 scale-105",
              )}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {plan.monthlyPrice === 0
                        ? "/forever"
                        : isYearly
                          ? "/year"
                          : "/month"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-primary">{plan.credits}</p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <a href={plan.id === "team" ? "#contact" : "/"}>
                    {plan.buttonText}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          All plans include 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
