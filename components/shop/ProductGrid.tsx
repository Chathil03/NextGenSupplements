import { supabase } from "@/lib/supabase";
import ProductGridClient from "./ProductGridClient";

export default async function ProductGrid({
  category,
}: {
  category?: string;
}) {
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data: products, error } = await query;

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <p className="text-secondary font-body-md">
          Failed to load products. Please try again.
        </p>
      </div>
    );
  }

  return <ProductGridClient products={products ?? []} />;
}
