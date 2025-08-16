import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Database, Package, Users, Mail, Shield, HelpCircle, FileText, Link as LinkIcon } from "lucide-react";

export function DataDisplayDemo() {
  const { scrapedData, isLoading } = useData();

  if (isLoading) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Database className="h-5 w-5" />
            Data Access Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading data...</p>
        </CardContent>
      </Card>
    );
  }

  if (!scrapedData) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Database className="h-5 w-5" />
            Data Access Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No data available. Please scrape a store first.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Database className="h-5 w-5" />
          Data Access Demo - {scrapedData.brand_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Store Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Package className="h-4 w-4" />
              Store Info
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Platform: {scrapedData.is_shopify ? 'Shopify' : 'Other'}</p>
              <p>Brand: {scrapedData.brand_name}</p>
              <p>URL: {scrapedData.base_url}</p>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Package className="h-4 w-4" />
              Products
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Total: {scrapedData.product_catalog.length}</p>
              <p>Featured: {scrapedData.hero_products.length}</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Users className="h-4 w-4" />
              Social Media
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Instagram: {scrapedData.social_handles.instagram ? 'Yes' : 'No'}</p>
              <p>Facebook: {scrapedData.social_handles.facebook ? 'Yes' : 'No'}</p>
              <p>Twitter: {scrapedData.social_handles.twitter ? 'Yes' : 'No'}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Mail className="h-4 w-4" />
              Contact
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Emails: {scrapedData.contact_details.emails.length}</p>
              <p>Phones: {scrapedData.contact_details.phones.length}</p>
              <p>Address: {scrapedData.contact_details.address ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              {Object.values(scrapedData.policies).filter(Boolean).length} Policies
            </Badge>
            <Badge variant="outline" className="text-xs">
              <HelpCircle className="h-3 w-3 mr-1" />
              {scrapedData.faqs.length} FAQs
            </Badge>
            <Badge variant="outline" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              About: {scrapedData.about_text.length > 100 ? 'Long' : 'Short'}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <LinkIcon className="h-3 w-3 mr-1" />
              {Object.values(scrapedData.important_links).filter(Boolean).length} Links
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
