export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
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
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
      goals: {
        Row: {
          id: number;
          title: string;
          slug: string;
          description: string;
          image_url: string;
          image_alt: string;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["goals"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["goals"]["Insert"]>;
      };
      newsletter_subscribers: {
        Row: {
          id: number;
          email: string;
          created_at: string;
        };
        Insert: { email: string };
        Update: never;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};
