import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeedbackWidgetProps {
  pageId: string;
  onFeedback?: (pageId: string, isHelpful: boolean) => void;
}

export default function FeedbackWidget({ pageId, onFeedback }: FeedbackWidgetProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);

  const handleFeedback = (helpful: boolean) => {
    setIsHelpful(helpful);
    setSubmitted(true);
    onFeedback?.(pageId, helpful);
    console.log('Feedback submitted:', { pageId, isHelpful: helpful });
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
