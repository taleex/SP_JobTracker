import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section-top-container">
        <h1 className="hero-title">Track your candidatures</h1>
        <p className="hero-paragraph">
          be always in <span className="hero-paragraph-span">Track</span> of
          your candidatures progress.
        </p>
        <div className="hero-buttons">
          <Button className={cn("hero-button-getstarted")} variant="secondary">
            Get Started
          </Button>
          <Button className={cn("hero-button-learnmore")} variant="outline">
            Learn more
          </Button>
        </div>
      </div>
      <div className="hero-section-bottom-container">test</div>
    </section>
  );
}
