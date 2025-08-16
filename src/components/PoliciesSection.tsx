import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Shield } from "lucide-react";

interface PoliciesProps {
  policies: {
    privacy_policy_url?: string | null;
    refund_policy_url?: string | null;
    terms_url?: string | null;
    shipping_policy_url?: string | null;
  };
}

export function PoliciesSection({ policies }: PoliciesProps) {
  const policyLinks = [
    { key: 'privacy_policy_url', name: 'Privacy Policy', url: policies.privacy_policy_url },
    { key: 'refund_policy_url', name: 'Refund Policy', url: policies.refund_policy_url },
    { key: 'terms_url', name: 'Terms of Service', url: policies.terms_url },
    { key: 'shipping_policy_url', name: 'Shipping Policy', url: policies.shipping_policy_url },
  ];

  const availablePolicies = policyLinks.filter(policy => policy.url);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5" />
          Policies & Legal
        </CardTitle>
      </CardHeader>
      <CardContent>
        {availablePolicies.length === 0 ? (
          <p className="text-muted-foreground">No policy links found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availablePolicies.map(policy => (
              <Button
                key={policy.key}
                variant="outline"
                size="sm"
                className="justify-start hover:shadow-glow transition-all duration-300"
                asChild
              >
                <a
                  href={policy.url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {policy.name}
                  <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}