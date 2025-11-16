import { useQuery } from "@tanstack/react-query";
import WebsiteCard from "@/components/WebsiteCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Website } from "@shared/schema";

export default function WebsitesPage() {
  const { data: websites, isLoading } = useQuery<Website[]>({
    queryKey: ["/api/websites"],
  });

  return (
    <div className="container mx-auto px-6 py-8" data-testid="page-websites">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Our Websites</h1>
        <p className="text-lg text-muted-foreground">
          Explore the portfolio of websites we've created
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </>
        ) : websites && websites.length > 0 ? (
          websites.map((website) => (
            <WebsiteCard key={website.id} {...website} image={website.image ?? undefined} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No websites to display yet. Check back soon!
          </div>
        )}
      </div>
    </div>
  );
}
