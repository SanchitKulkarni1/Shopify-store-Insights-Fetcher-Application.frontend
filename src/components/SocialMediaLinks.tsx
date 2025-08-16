import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users } from "lucide-react";
import { SocialHandles as SocialHandlesType } from "@/types";

interface SocialMediaLinksProps {
  socialHandles: SocialHandlesType;
}

export function SocialMediaLinks({ socialHandles }: SocialMediaLinksProps) {
  const socialPlatforms = [
    { key: 'instagram', name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { key: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
    { key: 'tiktok', name: 'TikTok', color: 'bg-black' },
    { key: 'twitter', name: 'Twitter/X', color: 'bg-gray-800' },
    { key: 'youtube', name: 'YouTube', color: 'bg-red-600' },
    { key: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
    { key: 'pinterest', name: 'Pinterest', color: 'bg-red-500' },
  ];

  const availableLinks = socialPlatforms.filter(
    platform => socialHandles[platform.key as keyof SocialHandlesType]
  );

  const otherLinks = socialHandles.others ? Object.entries(socialHandles.others) : [];

  if (availableLinks.length === 0 && otherLinks.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5" />
            Social Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No social media links found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5" />
          Social Media
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableLinks.map(platform => (
            <Button
              key={platform.key}
              variant="outline"
              size="sm"
              className="justify-start hover:shadow-glow transition-all duration-300"
              asChild
            >
              <a
                href={socialHandles[platform.key as keyof SocialHandlesType] as string}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`w-3 h-3 rounded-full ${platform.color} mr-2`} />
                {platform.name}
                <ExternalLink className="ml-auto h-3 w-3" />
              </a>
            </Button>
          ))}
          
          {otherLinks.map(([platform, url]) => (
            <Button
              key={platform}
              variant="outline"
              size="sm"
              className="justify-start hover:shadow-glow transition-all duration-300"
              asChild
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                <div className="w-3 h-3 rounded-full bg-primary mr-2" />
                {platform}
                <ExternalLink className="ml-auto h-3 w-3" />
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}