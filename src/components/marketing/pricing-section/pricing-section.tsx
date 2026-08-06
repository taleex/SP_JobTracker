import db from "@/lib/db";
import { PlanCard } from "./plan-card";

export default async function PricingSection() {
  const plans = await db.plan.findMany({
    orderBy: { price: "asc" },
  });

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground">
          Choose the plan that fits your job search journey. Upgrade anytime.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}
