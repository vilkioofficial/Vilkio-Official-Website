import WebsiteCard from '../WebsiteCard';

export default function WebsiteCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <WebsiteCard
        id="example-1"
        url="https://example.com"
        title="Example Portfolio"
        description="A beautiful portfolio website showcasing creative work and projects."
      />
      <WebsiteCard
        id="example-2"
        url="https://demo.com"
        title="Demo Store"
        description="An e-commerce platform with modern design and seamless checkout experience."
      />
    </div>
  );
}
