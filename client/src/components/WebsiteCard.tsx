import { ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface WebsiteCardProps {
  id: string;
  url: string;
  title: string;
  description: string;
  image?: string;
}

export default function WebsiteCard({ id, url, title, description, image }: WebsiteCardProps) {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card
      className="hover-elevate active-elevate-2 transition-all cursor-pointer overflow-hidden"
      onClick={handleClick}
      data-testid={`card-website-${id}`}
    >
      {image && (
        <div className="aspect-video bg-muted overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1 truncate">
              {url}
            </CardDescription>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
