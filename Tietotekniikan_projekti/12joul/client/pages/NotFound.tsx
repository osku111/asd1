import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl font-semibold text-foreground mb-2">Page Not Found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist. It might have been moved or removed.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
