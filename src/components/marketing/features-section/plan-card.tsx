import { Card, CardContent, CardTitle } from "@/components/ui/card";

type TFeatureCardProps = {
  title: string;
  subtitle: string;
  logo: string;
};

export default function PlanCard({ title, subtitle, logo }: TFeatureCardProps) {
  return (
    <Card className="p-6">
      <CardContent>
        <div className="text-4xl mb-4">{logo}</div>
        <CardTitle className="text-lg font-semibold mb-2">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
