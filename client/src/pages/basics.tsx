import KeyboardShortcut from "@/components/KeyboardShortcut";
import FeedbackWidget from "@/components/FeedbackWidget";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BasicsPage() {
  const instructions = [
    {
      id: "example-site",
      websiteUrl: "https://example.com",
      favicon: "🌐",
      title: "Example Website Guide",
      shortcuts: [
        { label: "Search", keys: ["Ctrl", "F"] },
        { label: "Navigate", keys: ["Ctrl", "K"] },
        { label: "Save", keys: ["Ctrl", "S"] },
      ],
      content: "Learn how to navigate and use Example Website effectively with these keyboard shortcuts and tips.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl" data-testid="page-basics">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Basics</h1>
        <p className="text-lg text-muted-foreground">
          Essential instructions and keyboard shortcuts for our websites
        </p>
      </div>

      <div className="space-y-6">
        {instructions.map((instruction) => (
          <Card key={instruction.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{instruction.favicon}</span>
                <CardTitle className="text-xl">{instruction.title}</CardTitle>
                <span className="text-sm text-muted-foreground">({instruction.websiteUrl})</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{instruction.content}</p>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Keyboard Shortcuts:</h4>
                {instruction.shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm w-24">{shortcut.label}:</span>
                    <KeyboardShortcut keys={shortcut.keys} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FeedbackWidget pageId="basics" />
    </div>
  );
}
