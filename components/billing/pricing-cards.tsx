"use client";

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
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out BuildAI",
    price: "$0",
    period: "forever",
    credits: "100 credits/month",
    features: [
      "Up to 3 projects",
      "Basic AI generation",
      "Community support",
      "Export to ZIP",
      "Public templates",
    ],
    buttonText: "Current Plan",
    current: true,
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For serious builders and small teams",
    price: "$29",
    period: "/month",
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
    buttonText: "Upgrade to Pro",
    current: false,
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    description: "For growing teams and organizations",
    price: "$99",
    period: "/month",
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
    current: false,
    highlighted: false,
  },
];

export default function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            "relative flex flex-col border-border",
            plan.highlighted && "border-primary shadow-lg shadow-primary/10",
          )}
        >
          {plan.highlighted && (
            <Badge className="absolute top-2 left-1/2 -translate-x-1/2">
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
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="ml-1 text-muted-foreground">
                  {plan.period}
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
              variant={
                plan.current
                  ? "outline"
                  : plan.highlighted
                    ? "default"
                    : "secondary"
              }
              className="w-full"
              disabled={plan.current}
            >
              {plan.buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
