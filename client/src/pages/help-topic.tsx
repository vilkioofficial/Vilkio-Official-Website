import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import FeedbackWidget from "@/components/FeedbackWidget";
import { Skeleton } from "@/components/ui/skeleton";
import type { HelpTopic } from "@shared/schema";

export default function HelpTopicPage() {
  const [, params] = useRoute("/help/:id");
  const topicId = params?.id || "";

  const { data: topic, isLoading } = useQuery<HelpTopic>({
    queryKey: ["/api/help-topics", topicId],
    enabled: !!topicId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="container mx-auto px-6 py-8 max-w-4xl" data-testid="page-help-topic">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <p className="text-muted-foreground">The requested topic could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl" data-testid="page-help-topic">
      <article className="prose prose-gray dark:prose-invert max-w-none">
        <h1>{topic.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: topic.content }} />
      </article>

      <FeedbackWidget pageId={topicId} />
    </div>
  );
}
