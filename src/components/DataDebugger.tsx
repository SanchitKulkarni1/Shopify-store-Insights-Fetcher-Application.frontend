import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/contexts/DataContext";
import { Bug, AlertCircle, CheckCircle } from "lucide-react";

export function DataDebugger() {
  const { scrapedData, isLoading } = useData();

  if (isLoading) {
    return (
      <Card className="shadow-card border-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bug className="h-5 w-5 text-yellow-500" />
            Data Debugger - Loading
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Fetching data from backend...</p>
        </CardContent>
      </Card>
    );
  }

  if (!scrapedData) {
    return (
      <Card className="shadow-card border-red-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bug className="h-5 w-5 text-red-500" />
            Data Debugger - No Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">No data available. This means either:</p>
          <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
            <li>No store has been scraped yet</li>
            <li>Backend didn't return data</li>
            <li>Data structure is incorrect</li>
          </ul>
        </CardContent>
      </Card>
    );
  }

  // Check data structure
  const hasRequiredFields = scrapedData.brand_name && scrapedData.is_shopify !== undefined;
  const dataType = typeof scrapedData;
  const dataKeys = Object.keys(scrapedData);
  const dataValues = Object.values(scrapedData);

  return (
    <Card className="shadow-card border-green-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bug className="h-5 w-5 text-green-500" />
          Data Debugger - Data Received
          {hasRequiredFields ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Data Structure Info */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Data Structure:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline" className="ml-2">{dataType}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Keys:</span>
                <Badge variant="outline" className="ml-2">{dataKeys.length}</Badge>
              </div>
            </div>
          </div>

          {/* Required Fields Check */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Required Fields:</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">brand_name:</span>
                {scrapedData.brand_name ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">{scrapedData.brand_name || 'Missing'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">is_shopify:</span>
                {scrapedData.is_shopify !== undefined ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm">{scrapedData.is_shopify !== undefined ? scrapedData.is_shopify.toString() : 'Missing'}</span>
              </div>
            </div>
          </div>

          {/* All Keys */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">All Data Keys:</h4>
            <div className="flex flex-wrap gap-1">
              {dataKeys.map((key) => (
                <Badge key={key} variant="outline" className="text-xs">
                  {key}
                </Badge>
              ))}
            </div>
          </div>

          {/* Raw Data Preview */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Raw Data Preview:</h4>
            <div className="bg-muted p-3 rounded-md">
              <pre className="text-xs overflow-auto max-h-40">
                {JSON.stringify(scrapedData, null, 2)}
              </pre>
            </div>
          </div>

          {/* Data Summary */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Data Summary:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Products:</span>
                <Badge variant="secondary" className="ml-2">
                  {Array.isArray(scrapedData.product_catalog) ? scrapedData.product_catalog.length : 'N/A'}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">FAQs:</span>
                <Badge variant="secondary" className="ml-2">
                  {Array.isArray(scrapedData.faqs) ? scrapedData.faqs.length : 'N/A'}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Emails:</span>
                <Badge variant="secondary" className="ml-2">
                  {Array.isArray(scrapedData.contact_details?.emails) ? scrapedData.contact_details.emails.length : 'N/A'}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Social:</span>
                <Badge variant="secondary" className="ml-2">
                  {scrapedData.social_handles ? Object.keys(scrapedData.social_handles).filter(k => scrapedData.social_handles[k]).length : 'N/A'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
