import { useState } from "react";
import { Navigate } from "react-router-dom";
import { MOCK_USERS, setCurrentUser, getCurrentUser } from "@/lib/auth";
import { MapPin, LogIn } from "lucide-react";

export default function Login() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const currentUser = getCurrentUser();

  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (userId: string) => {
    setCurrentUser(userId);
    // Page will redirect via the useEffect above
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <MapPin className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">TrackGPS</h1>
          </div>
          <p className="text-lg font-semibold text-foreground mb-2">GPS Device Tracking System</p>
          <p className="text-muted-foreground">Select your account to continue</p>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {MOCK_USERS.map((user) => (
            <button
              key={user.id}
              onClick={() => handleLogin(user.id)}
              className={`p-6 rounded-lg border-2 transition-all transform hover:scale-105 ${
                selectedUserId === user.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="text-4xl mb-3">{user.avatar}</div>
              <h2 className="text-xl font-semibold text-foreground text-left mb-1">{user.name}</h2>
              <p className="text-sm text-muted-foreground text-left mb-3">{user.email}</p>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span
                  className={`inline-block px-2 py-1 rounded ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-700"
                      : user.role === "operator"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogin(user.id);
                }}
                className="mt-4 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Demo Mode: Click any user to login. No password required.
          </p>
        </div>
      </div>
    </div>
  );
}
