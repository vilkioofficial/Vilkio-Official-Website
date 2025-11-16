import HelpTopicCard from "@/components/HelpTopicCard";

export default function HelpPage() {
  const mockTopics = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of using our platform and setting up your first project.",
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about features, billing, and support.",
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Resolve common issues and learn how to get help when you need it.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl" data-testid="page-help">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-lg text-muted-foreground">
          Browse our help topics to find the information you need
        </p>
      </div>

      <div className="space-y-4">
        {mockTopics.map((topic) => (
          <HelpTopicCard key={topic.id} {...topic} />
        ))}
      </div>
    </div>
  );
}
