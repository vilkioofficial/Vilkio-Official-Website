import WebsiteCard from "@/components/WebsiteCard";

export default function WebsitesPage() {
  const mockWebsites = [
    {
      id: "portfolio-1",
      url: "https://example-portfolio.com",
      title: "Creative Portfolio",
      description: "A stunning portfolio showcasing creative work with modern design and smooth animations.",
    },
    {
      id: "ecommerce-1",
      url: "https://example-store.com",
      title: "Modern E-Commerce",
      description: "Full-featured online store with secure checkout and inventory management.",
    },
    {
      id: "blog-1",
      url: "https://example-blog.com",
      title: "Tech Blog Platform",
      description: "Content-rich blogging platform with SEO optimization and social sharing features.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8" data-testid="page-websites">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Websites</h1>
        <p className="text-lg text-muted-foreground">
          Explore the portfolio of websites we've created
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWebsites.map((website) => (
          <WebsiteCard key={website.id} {...website} />
        ))}
      </div>
    </div>
  );
}
