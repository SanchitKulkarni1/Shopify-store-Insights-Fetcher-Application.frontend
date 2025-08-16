import { useState } from "react";
import { ScrapingForm } from "@/components/ScrapingForm";
import { StoreOverview } from "@/components/StoreOverview";
import { ProductCatalog } from "@/components/ProductCatalog";
import { SocialMediaLinks } from "@/components/SocialMediaLinks";
import { ContactDetails } from "@/components/ContactDetails";
import { PoliciesSection } from "@/components/PoliciesSection";
import { FAQsSection } from "@/components/FAQsSection";
import { AboutSection } from "@/components/AboutSection";
import { ImportantLinks } from "@/components/ImportantLinks";
import { useToast } from "@/hooks/use-toast";

// Sample data for demonstration
const sampleData = {
  is_shopify: true,
  brand_name: "Me&My",
  base_url: "https://memy.co.in",
  product_catalog: [
    {
      title: "Royal Purple Cotton Printed Kurta Set with Dupatta",
      handle: "royal-purple-cotton-printed-kurta-set-with-dupatta",  
      url: "https://memy.co.in/products/royal-purple-cotton-printed-kurta-set-with-dupatta",
      price: "1299.00",
      currency: "INR",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop",
      tags: ["Cotton", "Floral", "XL", "sale", "ethnic", "kurta"]
    },
    {
      title: "Best Seller Kurta",
      handle: "best-seller-kurta",
      url: "https://memy.co.in/products/best-seller-kurta", 
      price: "999.00",
      currency: "INR",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      tags: ["Cotton", "Casual", "M", "bestseller"]
    },
    {
      title: "Elegant Blue Silk Saree",
      handle: "elegant-blue-silk-saree",
      url: "https://memy.co.in/products/elegant-blue-silk-saree",
      price: "2499.00", 
      currency: "INR",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
      tags: ["Silk", "Blue", "Traditional", "Wedding"]
    },
    {
      title: "Casual Cotton Dress",
      handle: "casual-cotton-dress",
      url: "https://memy.co.in/products/casual-cotton-dress",
      price: "799.00",
      currency: "INR", 
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
      tags: ["Cotton", "Casual", "Summer", "Dress"]
    }
  ],
  hero_products: [
    {
      title: "Best Seller Kurta",
      handle: "best-seller-kurta",
      url: "https://memy.co.in/products/best-seller-kurta",
      price: "999.00",
      currency: "INR",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      tags: ["Cotton", "Casual", "M", "bestseller"]
    }
  ],
  policies: {
    privacy_policy_url: "https://memy.co.in/policies/privacy-policy",
    refund_policy_url: "https://memy.co.in/policies/refund-policy", 
    terms_url: "https://memy.co.in/policies/terms-of-service",
    shipping_policy_url: "https://memy.co.in/policies/shipping-policy"
  },
  faqs: [
    {
      question: "Do you have COD?",
      answer: "Yes, we do offer Cash on Delivery for all orders within India."
    },
    {
      question: "What is your return policy?", 
      answer: "We offer a 30-day return policy for all products in original condition."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days."
    }
  ],
  social_handles: {
    instagram: "https://www.instagram.com/memy.co.in/",
    facebook: "https://www.facebook.com/memy.co.in",
    tiktok: null,
    twitter: null,
    youtube: null,
    linkedin: null,
    pinterest: null,
    others: {}
  },
  contact_details: {
    emails: ["care@memy.co.in"],
    phones: ["022 6962 0753"],  
    address: "Mumbai, Maharashtra, India"
  },
  about_text: "Me&My is a contemporary Indian fashion brand that brings you the finest collection of ethnic wear and fusion clothing. We believe in celebrating Indian heritage through modern designs that speak to today's confident woman. Our carefully curated collection features traditional silhouettes with contemporary touches, perfect for the modern Indian woman who values both style and comfort.",
  important_links: {
    order_tracking: "https://memy.shiprocket.co/tracking",
    contact_us: "https://memy.co.in/pages/contact",
    blog: null,
    others: {}
  }
};

const Index = () => {
  const [scrapedData, setScrapedData] = useState<typeof sampleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleScrapeSubmit = async (url: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, always return sample data
      setScrapedData(sampleData);
      
      toast({
        title: "Success!",
        description: "Store data extracted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze store. Please try again.",
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
        <div className="container mx-auto px-4 py-12 space-y-8">
          {/* Store Overview */}
          <StoreOverview data={scrapedData} />

          {/* Hero Products */}
          {scrapedData.hero_products.length > 0 && (
            <ProductCatalog 
              products={scrapedData.hero_products} 
              title="Featured Products" 
            />
          )}

          {/* Product Catalog */}
          {scrapedData.product_catalog.length > 0 && (
            <ProductCatalog 
              products={scrapedData.product_catalog} 
              title="Product Catalog" 
            />
          )}

          {/* Grid Layout for Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Social Media */}
            <SocialMediaLinks socialHandles={scrapedData.social_handles} />

            {/* Contact Details */}
            <ContactDetails contactDetails={scrapedData.contact_details} />

            {/* Policies */}
            <PoliciesSection policies={scrapedData.policies} />

            {/* Important Links */}
            <ImportantLinks importantLinks={scrapedData.important_links} />
          </div>

          {/* Full Width Sections */}
          <div className="space-y-8">
            {/* FAQs */}
            <FAQsSection faqs={scrapedData.faqs} />

            {/* About */}
            <AboutSection aboutText={scrapedData.about_text} />
          </div>
        </div>
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