import { CreditCard } from "lucide-react";

export default function BillingHeader() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
      </div>
      <p className="text-lg text-muted-foreground">
        Manage your subscription and billing details.
      </p>
    </div>
  );
}
