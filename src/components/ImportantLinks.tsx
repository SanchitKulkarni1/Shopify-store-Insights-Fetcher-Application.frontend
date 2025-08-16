import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Link as LinkIcon } from "lucide-react";

interface ImportantLinksProps {
  importantLinks: {
    order_tracking?: string | null;
    contact_us?: string | null;
    blog?: string | null;
    others?: Record<string, string>;
  };
}

export function ImportantLinks({ importantLinks }: ImportantLinksProps) {
  const standardLinks = [
    { key: 'order_tracking', name: 'Order Tracking', url: importantLinks.order_tracking },
    { key: 'contact_us', name: 'Contact Us', url: importantLinks.contact_us },
    { key: 'blog', name: 'Blog', url: importantLinks.blog },
  ];

  const availableStandardLinks = standardLinks.filter(link => link.url);
  const otherLinks = importantLinks.others ? Object.entries(importantLinks.others) : [];
  const hasAnyLinks = availableStandardLinks.length > 0 || otherLinks.length > 0;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <LinkIcon className="h-5 w-5" />
          Important Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasAnyLinks ? (
          <p className="text-muted-foreground">No important links found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableStandardLinks.map(link => (
              <Button
                key={link.key}
                variant="outline"
                size="sm"
                className="justify-start hover:shadow-glow transition-all duration-300"
                asChild
              >
                <a
                  href={link.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                  <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              </Button>
            ))}
            
            {otherLinks.map(([name, url]) => (
              <Button
                key={name}
                variant="outline"
                size="sm"
                className="justify-start hover:shadow-glow transition-all duration-300"
                asChild
              >
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {name}
                  <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}