export interface Product {
  title: string;
  handle: string;
  url: string;
  price: string;
  currency: string;
  image: string;
  tags: string[];
}

export interface Policies {
  privacy_policy_url: string;
  refund_policy_url: string;
  terms_url: string;
  shipping_policy_url: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SocialHandles {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  pinterest?: string;
  others: Record<string, string>;
}

export interface ContactDetails {
  emails: string[];
  phones: string[];
  address: string;
}

export interface ImportantLinks {
  order_tracking?: string;
  contact_us?: string;
  blog?: string;
  others: Record<string, string>;
}

export interface ScrapedData {
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


