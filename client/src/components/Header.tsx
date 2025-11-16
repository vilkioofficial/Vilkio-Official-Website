import { Link, useLocation } from "wouter";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logoImg from "@assets/20251115_185356_1763271286249.png";

interface HeaderProps {
  unreadCount?: number;
  onNotificationClick?: () => void;
}

export default function Header({ unreadCount = 0, onNotificationClick }: HeaderProps) {
  const [location] = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/help", label: "Help" },
    { path: "/basics", label: "Basics" },
    { path: "/websites", label: "Websites" },
    { path: "/privacy", label: "Privacy" },
    { path: "/terms", label: "Terms" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background border-b h-16 flex items-center px-6" data-testid="header-main">
      <div className="flex items-center gap-8 flex-1">
        <Link href="/" data-testid="link-home">
          <span className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 py-1 cursor-pointer">
            <img src={logoImg} alt="Vilkio" className="h-8" />
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <span
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate active-elevate-2 cursor-pointer inline-block ${
                  location === link.path
                    ? "text-primary"
                    : "text-foreground"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="relative"
          onClick={onNotificationClick}
          data-testid="button-notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs"
              data-testid="badge-notification-count"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
