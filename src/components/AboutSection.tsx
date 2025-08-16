import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

interface AboutSectionProps {
  aboutText: string;
}

export function AboutSection({ aboutText }: AboutSectionProps) {
  if (!aboutText || aboutText.trim().length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FileText className="h-5 w-5" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No about information found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5" />
          About
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {aboutText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}