import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import type { Plan } from "@/generated/prisma/client";

export function PlanCard({ plan }: { plan: Plan }) {
  const isFree = plan.price === 0;
  const formattedPrice = isFree ? "$0" : `$${plan.price.toFixed(2)}`;

  return (
    <Card className={`p-6 ${plan.popular ? "ring-2 ring-primary" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
          {plan.popular && <Badge>Popular</Badge>}
        </div>
        <div className="mt-4">
          <span className="text-4xl font-bold">{formattedPrice}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={plan.popular ? "default" : "outline"}
        >
          {isFree ? "Get Started" : "Upgrade"}
        </Button>
      </CardFooter>
    </Card>
  );
}
