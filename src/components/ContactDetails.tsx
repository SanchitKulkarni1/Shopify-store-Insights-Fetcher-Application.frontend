import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Contact } from "lucide-react";

interface ContactDetailsProps {
  contactDetails: {
    emails: string[];
    phones: string[];
    address: string | null;
  };
}

export function ContactDetails({ contactDetails }: ContactDetailsProps) {
  const hasAnyContact = contactDetails.emails.length > 0 || 
                       contactDetails.phones.length > 0 || 
                       contactDetails.address;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Contact className="h-5 w-5" />
          Contact Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasAnyContact ? (
          <p className="text-muted-foreground">No contact information found</p>
        ) : (
          <div className="space-y-4">
            {contactDetails.emails.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Mail className="h-4 w-4" />
                  Email{contactDetails.emails.length > 1 ? 's' : ''}
                </div>
                <div className="space-y-1">
                  {contactDetails.emails.map((email, index) => (
                    <a
                      key={index}
                      href={`mailto:${email}`}
                      className="block text-primary hover:text-primary-glow transition-colors"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {contactDetails.phones.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Phone className="h-4 w-4" />
                  Phone{contactDetails.phones.length > 1 ? 's' : ''}
                </div>
                <div className="space-y-1">
                  {contactDetails.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone}`}
                      className="block text-primary hover:text-primary-glow transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {contactDetails.address && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4" />
                  Address
                </div>
                <p className="text-muted-foreground">{contactDetails.address}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}