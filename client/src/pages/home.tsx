import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HelpCircle, BookOpen, Globe, Shield } from "lucide-react";
import logoImg from "@assets/20251115_185356_1763271286249.png";

export default function HomePage() {
  const features = [
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Find answers and guides to help you get started",
      link: "/help",
    },
    {
      icon: BookOpen,
      title: "Basics",
      description: "Learn the fundamentals and best practices",
      link: "/basics",
    },
    {
      icon: Globe,
      title: "Our Websites",
      description: "Explore our portfolio of web projects",
      link: "/websites",
    },
    {
      icon: Shield,
      title: "Privacy & Terms",
      description: "Read our policies and terms of service",
      link: "/privacy",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16" data-testid="page-home">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <img src={logoImg} alt="Vilkio" className="h-24 mx-auto mb-8" data-testid="img-logo-hero" />
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
            Welcome to Vilkio
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your trusted partner for innovative web solutions and comprehensive documentation
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/help">
              <a>
                <Button size="lg" data-testid="button-get-started">
                  Get Started
                </Button>
              </a>
            </Link>
            <Link href="/websites">
              <a>
                <Button size="lg" variant="outline" data-testid="button-view-portfolio">
                  View Portfolio
                </Button>
              </a>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.link} href={feature.link}>
                <a data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
