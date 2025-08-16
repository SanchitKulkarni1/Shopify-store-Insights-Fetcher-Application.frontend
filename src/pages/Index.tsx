import { ScrapingForm } from "@/components/ScrapingForm";
import { StoreOverview } from "@/components/StoreOverview";
import { ProductCatalog } from "@/components/ProductCatalog";
import { SocialMediaLinks } from "@/components/SocialMediaLinks";
import { ContactDetails } from "@/components/ContactDetails";
import { PoliciesSection } from "@/components/PoliciesSection";
import { FAQsSection } from "@/components/FAQsSection";
import { AboutSection } from "@/components/AboutSection";
import { ImportantLinks } from "@/components/ImportantLinks";
import { DataDisplayDemo } from "@/components/DataDisplayDemo";
import { DataDebugger } from "@/components/DataDebugger";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useToast } from "@/hooks/use-toast";
import { ScrapedData } from "@/types";
import { useData } from "@/contexts/DataContext";


const Index = () => {
  const { scrapedData, setScrapedData, isLoading, setIsLoading } = useData();
  const { toast } = useToast();

  const handleScrapeSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      console.log("Index page received data:", data);
      
      // Validate that we have the required data structure
      if (!data || typeof data !== 'object') {
        throw new Error("Invalid data structure received");
      }
      
      // Check if this looks like our expected data structure
      if (!data.brand_name && !data.is_shopify) {
        console.warn("Data doesn't match expected structure:", data);
        // Try to find the data in different possible locations
        const possibleData = data.data || data.result || data.insights || data;
        if (possibleData && typeof possibleData === 'object') {
          console.log("Found data in alternative location:", possibleData);
          setScrapedData(possibleData);
        } else {
          throw new Error("Could not find valid store data in response");
        }
      } else {
        setScrapedData(data);
      }
      
      toast({
        title: "Success!",
        description: "Store data extracted successfully",
      });
    } catch (error: any) {
      console.error("Error processing scraped data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to analyze store. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero py-20 px-4">
        <div className="container mx-auto">
          <ScrapingForm onSubmit={handleScrapeSubmit} isLoading={isLoading} />
        </div>
      </div>

      {/* Results Section */}
      {scrapedData && (
        <ErrorBoundary>
          <div className="container mx-auto px-4 py-12 space-y-8">
            {/* Data Debugger - Shows exactly what data was received */}
            <DataDebugger />

            {/* Data Access Demo - Shows how to access data from any component */}
            <DataDisplayDemo />

            {/* Store Overview */}
            <StoreOverview data={scrapedData} />

            {/* Hero Products */}
            {scrapedData.hero_products && Array.isArray(scrapedData.hero_products) && scrapedData.hero_products.length > 0 && (
              <ProductCatalog 
                products={scrapedData.hero_products} 
                title="Featured Products" 
              />
            )}

            {/* Product Catalog */}
            {scrapedData.product_catalog && Array.isArray(scrapedData.product_catalog) && scrapedData.product_catalog.length > 0 && (
              <ProductCatalog 
                products={scrapedData.product_catalog} 
                title="Product Catalog" 
              />
            )}

            {/* Grid Layout for Additional Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Social Media */}
              {scrapedData.social_handles && (
                <SocialMediaLinks socialHandles={scrapedData.social_handles} />
              )}

              {/* Contact Details */}
              {scrapedData.contact_details && (
                <ContactDetails contactDetails={scrapedData.contact_details} />
              )}

              {/* Policies */}
              {scrapedData.policies && (
                <PoliciesSection policies={scrapedData.policies} />
              )}

              {/* Important Links */}
              {scrapedData.important_links && (
                <ImportantLinks importantLinks={scrapedData.important_links} />
              )}
            </div>

            {/* Full Width Sections */}
            <div className="space-y-8">
              {/* FAQs */}
              {scrapedData.faqs && Array.isArray(scrapedData.faqs) && scrapedData.faqs.length > 0 && (
                <FAQsSection faqs={scrapedData.faqs} />
              )}

              {/* About */}
              {scrapedData.about_text && (
                <AboutSection aboutText={scrapedData.about_text} />
              )}
            </div>
          </div>
        </ErrorBoundary>
      )}

      {/* Empty State */}
      {!scrapedData && !isLoading && (
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Analyze a Shopify Store?
            </h2>
            <p className="text-muted-foreground text-lg">
              Enter a Shopify store URL above to extract comprehensive data including products, 
              policies, FAQs, contact information, and more.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;