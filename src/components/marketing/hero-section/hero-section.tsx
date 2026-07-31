import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section-top-container">
        <h1 className="hero-title">Take Control of Your Job Search Journey</h1>
        <p className="hero-paragraph">
          Track applications, manage interviews, and land your dream job —{" "}
          <span className="hero-paragraph-span">all in one place</span>.
        </p>
        <div className="hero-image-wrapper">
          <Image
            src="/Images/dashboard.png"
            alt="JobTracker dashboard preview showing application management interface"
            width={1200}
            height={675}
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="hero-buttons">
          <Link href="/singup">
            <Button
              className={cn("hero-button-getstarted")}
              variant="secondary"
            >
              Get Started Free
            </Button>
          </Link>
          <Button className={cn("hero-button-learnmore")} variant="outline">
            See How It Works
          </Button>
        </div>
      </div>
    </section>
  );
}
