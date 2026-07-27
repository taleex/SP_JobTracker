import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-inner">
        <span className="not-found-404">404</span>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-description">
          Sorry, we could not find the page you are looking for. It might have
          been moved or does not exist.
        </p>
      </div>
      <div className="not-found-actions">
        <Link href="/app/dashboard" className="btn-link-primary">
          Go to Dashboard
        </Link>
        <Link href="/" className="btn-link-secondary">
          Home
        </Link>
      </div>
    </div>
  );
}
