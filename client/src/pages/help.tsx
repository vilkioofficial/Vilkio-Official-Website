import { useQuery } from "@tanstack/react-query";
import HelpTopicCard from "@/components/HelpTopicCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { HelpTopic } from "@shared/schema";

export default function HelpPage() {
  const { data: topics, isLoading } = useQuery<HelpTopic[]>({
    queryKey: ["/api/help-topics"],
  });

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl" data-testid="page-help">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-lg text-muted-foreground">
          Browse our help topics to find the information you need
        </p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : topics && topics.length > 0 ? (
          topics.map((topic) => (
            <HelpTopicCard key={topic.id} {...topic} />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No help topics available yet. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
}
