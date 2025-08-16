# Data Usage Guide

This guide explains how to access and use the scraped data from any component in your application.

## Overview

The application now uses React Context to make the scraped data available throughout the component tree. This means you can access the data from any component without prop drilling.

## How It Works

1. **Data Context**: The `DataContext` provides the scraped data and loading state to all components
2. **Data Provider**: The `DataProvider` wraps the entire application and manages the data state
3. **useData Hook**: Components use the `useData` hook to access the data

## Accessing Data in Any Component

### 1. Import the Hook

```tsx
import { useData } from "@/contexts/DataContext";
```

### 2. Use the Hook in Your Component

```tsx
import { useData } from "@/contexts/DataContext";

export function MyComponent() {
  const { scrapedData, isLoading } = useData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!scrapedData) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2>Store: {scrapedData.brand_name}</h2>
      <p>URL: {scrapedData.base_url}</p>
      <p>Products: {scrapedData.product_catalog.length}</p>
    </div>
  );
}
```

## Available Data Properties

The `scrapedData` object contains the following structure:

```tsx
interface ScrapedData {
  is_shopify: boolean;
  brand_name: string;
  base_url: string;
  product_catalog: Product[];
  hero_products: Product[];
  policies: Policies;
  faqs: FAQ[];
  social_handles: SocialHandles;
  contact_details: ContactDetails;
  about_text: string;
  important_links: ImportantLinks;
}
```

### Product Structure
```tsx
interface Product {
  title: string;
  handle: string;
  url: string;
  price: string;
  currency: string;
  image: string;
  tags: string[];
}
```

### Contact Details Structure
```tsx
interface ContactDetails {
  emails: string[];
  phones: string[];
  address: string;
}
```

### Social Media Structure
```tsx
interface SocialHandles {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  pinterest?: string;
  others: Record<string, string>;
}
```

## Example Usage Patterns

### 1. Display Store Information
```tsx
const { scrapedData } = useData();

return (
  <div>
    <h1>{scrapedData?.brand_name}</h1>
    <p>Platform: {scrapedData?.is_shopify ? 'Shopify' : 'Other'}</p>
    <a href={scrapedData?.base_url}>Visit Store</a>
  </div>
);
```

### 2. Show Product Count
```tsx
const { scrapedData } = useData();

return (
  <div>
    <h2>Product Catalog</h2>
    <p>Total Products: {scrapedData?.product_catalog.length || 0}</p>
    <p>Featured Products: {scrapedData?.hero_products.length || 0}</p>
  </div>
);
```

### 3. Display Contact Information
```tsx
const { scrapedData } = useData();

return (
  <div>
    <h3>Contact Information</h3>
    {scrapedData?.contact_details.emails.map((email, index) => (
      <a key={index} href={`mailto:${email}`}>{email}</a>
    ))}
    {scrapedData?.contact_details.phones.map((phone, index) => (
      <a key={index} href={`tel:${phone}`}>{phone}</a>
    ))}
    <p>{scrapedData?.contact_details.address}</p>
  </div>
);
```

### 4. Show Social Media Links
```tsx
const { scrapedData } = useData();

return (
  <div>
    <h3>Social Media</h3>
    {scrapedData?.social_handles.instagram && (
      <a href={scrapedData.social_handles.instagram}>Instagram</a>
    )}
    {scrapedData?.social_handles.facebook && (
      <a href={scrapedData.social_handles.facebook}>Facebook</a>
    )}
    {/* Add more social platforms as needed */}
  </div>
);
```

### 5. Display FAQs
```tsx
const { scrapedData } = useData();

return (
  <div>
    <h3>Frequently Asked Questions</h3>
    {scrapedData?.faqs.map((faq, index) => (
      <div key={index}>
        <h4>{faq.question}</h4>
        <p>{faq.answer}</p>
      </div>
    ))}
  </div>
);
```

## Loading and Error States

Always handle loading and empty states:

```tsx
const { scrapedData, isLoading } = useData();

if (isLoading) {
  return <div>Loading store data...</div>;
}

if (!scrapedData) {
  return <div>No store data available. Please scrape a store first.</div>;
}

// Your component logic here
return <div>Store: {scrapedData.brand_name}</div>;
```

## Best Practices

1. **Always check for data existence** before accessing properties
2. **Handle loading states** to provide good user experience
3. **Use optional chaining** (`?.`) to safely access nested properties
4. **Provide fallback values** for missing data
5. **Keep components focused** on specific data subsets

## Example Component

Here's a complete example of a component that uses the scraped data:

```tsx
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StoreSummary() {
  const { scrapedData, isLoading } = useData();

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <p>Loading store summary...</p>
        </CardContent>
      </Card>
    );
  }

  if (!scrapedData) {
    return (
      <Card>
        <CardContent>
          <p>No store data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Brand:</span>
            <Badge variant="outline">{scrapedData.brand_name}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Platform:</span>
            <Badge variant={scrapedData.is_shopify ? "default" : "destructive"}>
              {scrapedData.is_shopify ? "Shopify" : "Other"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Products:</span>
            <Badge variant="secondary">{scrapedData.product_catalog.length}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Contact Methods:</span>
            <Badge variant="secondary">
              {scrapedData.contact_details.emails.length + scrapedData.contact_details.phones.length}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Troubleshooting

- **Data not available**: Make sure the component is wrapped within the `DataProvider`
- **TypeScript errors**: Import the proper types from `@/types`
- **Undefined properties**: Always check if `scrapedData` exists before accessing properties

## Conclusion

With this setup, you can now access the scraped data from any component in your application using the `useData` hook. This provides a clean, maintainable way to share data across your component tree without prop drilling.
