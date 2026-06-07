// Shared TypeScript interfaces matching the Supabase schema

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  original_price: number | null;
  badge: string | null;
  image_url: string;
  image_alt: string;
  rating: number;
  review_count: number;
  is_featured: boolean;
  created_at: string;
}

export interface Goal {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  image_alt: string;
  sort_order: number;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  created_at: string;
}
