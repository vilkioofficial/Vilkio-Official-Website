import { useQuery } from "@tanstack/react-query";
import KeyboardShortcut from "@/components/KeyboardShortcut";
import FeedbackWidget from "@/components/FeedbackWidget";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { BasicsInstruction } from "@shared/schema";

export default function BasicsPage() {
  const { data: instructions, isLoading } = useQuery<BasicsInstruction[]>({
    queryKey: ["/api/basics"],
  });

  const parseKeyboardShortcuts = (content: string) => {
    const shortcuts: { label: string; keys: string[] }[] = [];
    const regex = /(\w+):\s*`([^`]+)`/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      shortcuts.push({
        label: match[1],
        keys: match[2].split('+').map(k => k.trim()),
      });
    }
    
    return shortcuts;
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl" data-testid="page-basics">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Basics</h1>
        <p className="text-lg text-muted-foreground">
          Essential instructions and keyboard shortcuts for our websites
        </p>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <>
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
          </>
        ) : instructions && instructions.length > 0 ? (
          instructions.map((instruction) => {
            const shortcuts = parseKeyboardShortcuts(instruction.content);
            return (
              <Card key={instruction.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {instruction.favicon && <span className="text-2xl">{instruction.favicon}</span>}
                    <CardTitle className="text-xl">{instruction.title}</CardTitle>
                    <span className="text-sm text-muted-foreground">({instruction.websiteUrl})</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div dangerouslySetInnerHTML={{ __html: instruction.description }} />
                  
                  {shortcuts.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">Keyboard Shortcuts:</h4>
                      {shortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-sm w-24">{shortcut.label}:</span>
                          <KeyboardShortcut keys={shortcut.keys} />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No instructions available yet. Check back soon!
          </div>
        )}
      </div>

      <FeedbackWidget pageId="basics" />
    </div>
  );
}
