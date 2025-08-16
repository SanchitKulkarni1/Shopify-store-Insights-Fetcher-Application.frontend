import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrapedData, BackendResponse } from "@/types";

interface ScrapingFormProps {
  onSubmit: (data: ScrapedData) => Promise<void>;
  isLoading: boolean;
}

export function ScrapingForm({ onSubmit, isLoading }: ScrapingFormProps) {
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url);
    } catch {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/fetch-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website_url: url }),
      });
      
      const data: BackendResponse = await response.json();
      console.log("Raw API response:", data);

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      // Try to extract the actual data from different possible locations
      let insightsData: ScrapedData | null = null;
      
      if (data.data && typeof data.data === 'object') {
        insightsData = data.data as ScrapedData;
        console.log("Found data in 'data' field");
      } else if (data.result && typeof data.result === 'object') {
        insightsData = data.result as ScrapedData;
        console.log("Found data in 'result' field");
      } else if (data.insights && typeof data.insights === 'object') {
        insightsData = data.insights as ScrapedData;
        console.log("Found data in 'insights' field");
      } else if (data.brand_name || data.is_shopify !== undefined) {
        // Data is directly in the response
        insightsData = data as ScrapedData;
        console.log("Found data directly in response");
      } else {
        console.error("Could not find valid data structure in response:", data);
        throw new Error("Invalid data structure received from backend");
      }

      console.log("Processed insights data:", insightsData);

      // Call onSubmit with the fetched data
      if (onSubmit && insightsData) {
        await onSubmit(insightsData);
      }

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch insights",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-primary shadow-elegant border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary-foreground">
          Shopify Store Analyzer
        </CardTitle>
        <CardDescription className="text-primary-foreground/80 text-lg">
          Extract comprehensive data from any Shopify store
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-primary-foreground font-medium">
              Store URL
            </Label>
            <div className="relative">
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://store.myshopify.com"
                className="pl-10 bg-white/10 border-white/20 text-foreground placeholder:text-white/60 focus:bg-white/20"
                disabled={isLoading}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white/20 hover:bg-white/30 text-foreground font-semibold py-3 border border-white/30 transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Store...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyze Store
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}