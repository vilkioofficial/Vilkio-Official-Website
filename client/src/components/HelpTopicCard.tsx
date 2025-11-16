import { ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";

interface HelpTopicCardProps {
  id: string;
  title: string;
  description: string;
}

export default function HelpTopicCard({ id, title, description }: HelpTopicCardProps) {
  return (
    <Link href={`/help/${id}`} data-testid={`card-topic-${id}`}>
      <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
