import BillingHeader from "@/components/billing/billing-header";
import PricingCards from "@/components/billing/pricing-cards";
import UsageOverview from "@/components/billing/usage-overview";

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <BillingHeader />
      <PricingCards />
      <UsageOverview />
    </div>
  );
}
