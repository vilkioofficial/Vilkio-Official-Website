import { useRoute } from "wouter";
import FeedbackWidget from "@/components/FeedbackWidget";

export default function HelpTopicPage() {
  const [, params] = useRoute("/help/:id");
  const topicId = params?.id || "";

  const mockContent = {
    "getting-started": {
      title: "Getting Started",
      content: `
        <h2>Welcome to Vilkio</h2>
        <p>This guide will help you get started with our platform quickly and easily.</p>
        
        <h3>Step 1: Create Your Account</h3>
        <p>Sign up for a free account to access all features and resources.</p>
        
        <h3>Step 2: Explore the Dashboard</h3>
        <p>Familiarize yourself with the main dashboard and navigation options.</p>
        
        <h3>Step 3: Start Your First Project</h3>
        <p>Follow our guided setup to create and configure your first project.</p>
      `,
    },
    faq: {
      title: "Frequently Asked Questions",
      content: `
        <h2>Common Questions</h2>
        
        <h3>How do I reset my password?</h3>
        <p>Click on "Forgot Password" on the login page and follow the instructions sent to your email.</p>
        
        <h3>What browsers are supported?</h3>
        <p>We support the latest versions of Chrome, Firefox, Safari, and Edge.</p>
        
        <h3>How can I contact support?</h3>
        <p>You can reach our support team through the contact form or via email at support@vilkio.com.</p>
      `,
    },
    troubleshooting: {
      title: "Troubleshooting",
      content: `
        <h2>Common Issues and Solutions</h2>
        
        <h3>Page Not Loading</h3>
        <p>Try clearing your browser cache and cookies, then refresh the page.</p>
        
        <h3>Upload Errors</h3>
        <p>Ensure your file size is under 10MB and in a supported format (PNG, JPG, PDF).</p>
        
        <h3>Connection Issues</h3>
        <p>Check your internet connection and firewall settings.</p>
      `,
    },
  };

  const topic = mockContent[topicId as keyof typeof mockContent] || {
    title: "Topic Not Found",
    content: "<p>The requested topic could not be found.</p>",
  };

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
