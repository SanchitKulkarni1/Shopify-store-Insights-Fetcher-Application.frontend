import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle, XCircle } from "lucide-react";

interface StoreOverviewProps {
  data: {
    is_shopify: boolean;
    brand_name: string;
    base_url: string;
  };
}

export function StoreOverview({ data }: StoreOverviewProps) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          Store Overview
          {data.is_shopify ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : (
            <XCircle className="h-5 w-5 text-destructive" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Platform:</span>
          <Badge variant={data.is_shopify ? "default" : "destructive"}>
            {data.is_shopify ? "Shopify Store" : "Not Shopify"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Brand Name:</span>
          <span className="font-semibold text-foreground">{data.brand_name}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Base URL:</span>
          <a 
            href={data.base_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-glow transition-colors flex items-center gap-1"
          >
            {data.base_url}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}