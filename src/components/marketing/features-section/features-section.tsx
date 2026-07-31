import { Card } from "@/components/ui/card";

type TFeatures = {
  title: string;
  subtitle: string;
  logo: string;
};

const features: TFeatures[] = [
  {
    title: "Track Every Application",
    subtitle:
      "Never lose sight of a job opportunity again. Log applications, interviews, and offers in one centralized dashboard.",
    logo: "📋",
  },
  {
    title: "Visual Pipeline",
    subtitle:
      "See your progress at a glance with an intuitive Kanban board. Drag and drop candidates from applied to hired.",
    logo: "📊",
  },
  {
    title: "Smart Reminders",
    subtitle:
      "Get timely notifications for follow-ups, interviews, and deadlines so you stay one step ahead of the competition.",
    logo: "🔔",
  },
  {
    title: "Detailed Analytics",
    subtitle:
      "Uncover insights about your job search — track response rates, interview conversions, and time-to-hire metrics.",
    logo: "📈",
  },
  {
    title: "Resume & Notes Storage",
    subtitle:
      "Attach tailored resumes, cover letters, and personal notes to each application so you're always prepared.",
    logo: "📁",
  },
  {
    title: "Collaborate with Your Team",
    subtitle:
      "Share job postings and candidate progress with your peers. Perfect for group hiring or internal referrals.",
    logo: "🤝",
  },
];

export default function FeaturesSection() {
  return (
    <section className="feature-section">
      {features.map((feature: TFeatures) => (
        <Card key={feature.title} className="feature-card">
          <div className="flex gap-2">
            <span>{feature.logo}</span>
            <h2>{feature.title}</h2>
          </div>
          <p>{feature.subtitle}</p>
        </Card>
      ))}
    </section>
  );
}
