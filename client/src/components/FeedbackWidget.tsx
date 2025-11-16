import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface FeedbackWidgetProps {
  pageId: string;
}

export default function FeedbackWidget({ pageId }: FeedbackWidgetProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);

  const feedbackMutation = useMutation({
    mutationFn: async (isHelpful: boolean) => {
      return apiRequest("/api/feedback", {
        method: "POST",
        body: JSON.stringify({ pageId, isHelpful }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      console.log('Feedback submitted successfully');
    },
  });

  const handleFeedback = (helpful: boolean) => {
    setIsHelpful(helpful);
    setSubmitted(true);
    feedbackMutation.mutate(helpful);
  };

  return (
    <div className="mt-16 pt-8 border-t" data-testid="widget-feedback">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-4">Was this helpful?</h3>
        
        {!submitted ? (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleFeedback(true)}
              className="gap-2"
              data-testid="button-feedback-yes"
            >
              <ThumbsUp className="h-5 w-5" />
              Yes
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleFeedback(false)}
              className="gap-2"
              data-testid="button-feedback-no"
            >
              <ThumbsDown className="h-5 w-5" />
              No
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground" data-testid="text-feedback-thanks">
            Thank you for your feedback!
            {isHelpful ? " We're glad this was helpful." : " We'll work on improving this content."}
          </p>
        )}
      </div>
    </div>
  );
}
