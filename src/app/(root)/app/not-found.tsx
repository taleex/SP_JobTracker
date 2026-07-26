import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-8xl font-bold text-muted-foreground/20">404</span>
        <h1 className="text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Sorry, we could not find the page you are looking for. It might have
          been moved or does not exist.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href="/app/dashboard"
          className="group/button inline-flex shrink-0 items-center justify-center rounded-2xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 h-8 gap-1.5 px-3 bg-primary text-primary-foreground hover:bg-primary/80"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/"
          className="group/button inline-flex shrink-0 items-center justify-center rounded-2xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 h-8 gap-1.5 px-3 border-border bg-background hover:bg-muted hover:text-foreground"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
