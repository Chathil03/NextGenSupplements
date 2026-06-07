import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-surface border border-outline-variant p-4 group flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[4/5] bg-surface-container mb-6 flex items-center justify-center overflow-hidden">
        <span className="absolute top-3 right-3 bg-on-background text-on-primary text-[10px] font-label-bold uppercase px-2 py-1 z-10">
          {product.badge}
        </span>
        <Image
          src={product.image_url}
          alt={product.image_alt}
          fill
          className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-1">
          {product.category}
        </span>
        <h3 className="font-label-bold text-label-bold text-on-background mb-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-label-bold text-headline-md text-primary">
            {formatPrice(product.price)}
          </span>
          {product.original_price && (
            <span className="text-secondary line-through text-label-sm">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
        <button className="mt-auto w-full bg-primary py-3 text-on-primary font-label-bold text-label-bold uppercase tracking-wider hover:bg-on-primary-fixed-variant transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default async function BestSellers() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  const products = data as Product[] | null;

  if (error || !products?.length) {
    return null;
  }

  return (
    <section className="py-section-padding bg-surface-container-low">
      <div className="px-gutter max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-background uppercase mb-4">
            Elite Performers
          </h2>
          <p className="font-body-md text-secondary max-w-xl mx-auto">
            Our most trusted formulas, used by professional athletes worldwide
            to shatter their limits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
