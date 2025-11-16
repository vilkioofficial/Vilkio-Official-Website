import HelpTopicCard from '../HelpTopicCard';

export default function HelpTopicCardExample() {
  return (
    <div className="p-8 space-y-4 max-w-2xl">
      <HelpTopicCard
        id="getting-started"
        title="Getting Started"
        description="Learn the basics of using our platform and setting up your first project."
      />
      <HelpTopicCard
        id="faq"
        title="Frequently Asked Questions"
        description="Find answers to common questions about features, billing, and support."
      />
    </div>
  );
}
