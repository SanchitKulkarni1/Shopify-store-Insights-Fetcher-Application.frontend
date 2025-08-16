import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Package } from "lucide-react";
import { Product } from "@/types";

interface ProductCatalogProps {
  products: Product[];
  title: string;
  showAll?: boolean;
}

export function ProductCatalog({ products, title, showAll = false }: ProductCatalogProps) {
  // Safety check for products array
  if (!products || !Array.isArray(products)) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Package className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No products available</p>
        </CardContent>
      </Card>
    );
  }

  const displayProducts = showAll ? products : products.slice(0, 8);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Package className="h-5 w-5" />
          {title}
          <Badge variant="secondary" className="ml-auto">
            {products.length} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayProducts.map((product, index) => {
            // Safety check for individual product
            if (!product || typeof product !== 'object') {
              return null; // Skip invalid products
            }
            
            return (
              <div
                key={index}
                className="group bg-gradient-secondary rounded-lg p-4 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square mb-3 overflow-hidden rounded-md bg-muted">
                  <img
                    src={product.image || '/placeholder.svg'}
                    alt={product.title || 'Product'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                
                <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-2">
                  {product.title || 'Untitled Product'}
                </h3>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary font-bold">
                    ${product.price || '0.00'}
                  </span>
                  {product.url && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {product.tags && Array.isArray(product.tags) && product.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="text-xs px-1 py-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {product.tags && Array.isArray(product.tags) && product.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      +{product.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {!showAll && products.length > 8 && (
          <div className="text-center mt-4">
            <Badge variant="secondary">
              and {products.length - 8} more products...
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}