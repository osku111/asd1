import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin, Smartphone, Route, BarChart3, Menu, Settings, Search, LogOut, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getCurrentUser, logout as logoutUser } from "@/lib/auth";
import { t } from "@/lib/i18n";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentUser = getCurrentUser();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: t("nav.dashboard"), icon: MapPin },
    { path: "/devices", label: t("nav.devices"), icon: Smartphone },
    { path: "/routes", label: t("nav.routes"), icon: Route },
    { path: "/reports", label: t("nav.reports"), icon: BarChart3 },
  ];

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Could navigate to a search results page or filter devices
      console.log("Search:", searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="hidden sm:inline text-primary">TrackGPS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 max-w-xs">
              {navItems.slice(0, 3).map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                    isActive(path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{label}</span>
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-sm">
              <div className="w-full relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-muted/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                />
              </div>
            </form>

            {/* Right Menu */}
            <div className="flex items-center gap-2">
              {/* Reports Link - Always visible on larger screens */}
              <Link
                to="/reports"
                className={cn(
                  "hidden md:flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive("/reports")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden xl:inline">{t("nav.reports")}</span>
              </Link>

              {/* Settings Link */}
              <Link
                to="/settings"
                className={cn(
                  "hidden md:flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive("/settings")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden xl:inline">{t("nav.settings")}</span>
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {currentUser?.avatar || currentUser?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-foreground">
                    {currentUser?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{currentUser?.name}</p>
                      <p className="text-xs text-muted-foreground">{currentUser?.email}</p>
                    </div>
                    <Link
                      to="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      {t("user.settings")}
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t("user.logout")}
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden border-t border-border py-4 space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors block",
                    isActive(path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors block",
                  isActive("/settings")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Settings className="w-4 h-4" />
                {t("nav.settings")}
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 TrackGPS. GPS Device Tracking System.
          </p>
        </div>
      </footer>
    </div>
  );
}
