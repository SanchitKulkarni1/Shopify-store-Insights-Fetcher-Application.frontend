import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Package } from "lucide-react";

interface Product {
  title: string;
  handle: string;
  url: string;
  price: string;
  currency: string | null;
  image: string;
  tags: string[];
}

interface ProductCatalogProps {
  products: Product[];
  title: string;
  showAll?: boolean;
}

export function ProductCatalog({ products, title, showAll = false }: ProductCatalogProps) {
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
          {displayProducts.map((product, index) => (
            <div
              key={index}
              className="group bg-gradient-secondary rounded-lg p-4 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square mb-3 overflow-hidden rounded-md bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-2">
                {product.title}
              </h3>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-primary font-bold">
                  ${product.price}
                </span>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 3).map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className="text-xs px-1 py-0"
                  >
                    {tag}
                  </Badge>
                ))}
                {product.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    +{product.tags.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          ))}
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