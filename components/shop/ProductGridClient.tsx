// Client-side controls (sort + pagination) for the ProductGrid
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";

const sortOptions = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Selling", value: "best_selling" },
];

const PAGE_SIZE = 6;

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="material-symbols-outlined text-[16px] text-primary"
          style={{ fontVariationSettings: `'FILL' ${i < rating ? 1 : 0}` }}
        >
          star
        </span>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant hover:shadow-xl transition-all duration-300 group">
      <div className="relative aspect-square overflow-hidden bg-white p-8">
        {product.badge && (
          <span className="absolute top-4 right-4 bg-on-background text-on-primary font-label-sm text-label-sm px-2 py-1 uppercase z-10">
            {product.badge}
          </span>
        )}
        <Image
          src={product.image_url}
          alt={product.image_alt}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500 p-8"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={product.rating} />
          <span className="font-label-sm text-label-sm text-secondary ml-1">
            ({product.review_count})
          </span>
        </div>
        <h2 className="font-headline-md text-headline-md mb-2 text-on-background">
          {product.name}
        </h2>
        <p className="font-body-md text-body-md text-secondary mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-md text-headline-md text-on-background">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-secondary line-through text-label-sm">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
          <button className="bg-primary-container text-on-primary-container px-4 py-2 font-label-bold text-label-bold rounded uppercase tracking-wide hover:bg-primary hover:text-on-primary transition-colors">
            Quick Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductGridClient({ products }: { products: Product[] }) {
  const [sortKey, setSortKey] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const sorted = [...products].sort((a, b) => {
    if (sortKey === "price_asc") return a.price - b.price;
    if (sortKey === "price_desc") return b.price - a.price;
    if (sortKey === "best_selling") return b.review_count - a.review_count;
    // newest: default order from server (created_at desc)
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSort = (value: string) => {
    setSortKey(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex-grow">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-outline-variant">
        <span className="font-body-md text-body-md text-secondary">
          Showing {products.length} Results
        </span>
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm uppercase text-secondary">
            Sort By:
          </span>
          <select
            value={sortKey}
            onChange={(e) => handleSort(e.target.value)}
            className="bg-transparent border-none font-label-bold text-label-bold text-on-surface focus:ring-0 cursor-pointer outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {paginated.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="material-symbols-outlined w-10 h-10 flex items-center justify-center border border-outline-variant hover:bg-on-background hover:text-on-primary transition-all disabled:opacity-40"
          >
            chevron_left
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 flex items-center justify-center font-label-bold text-label-bold transition-all ${
                  currentPage === page
                    ? "bg-on-background text-on-primary"
                    : "border border-outline-variant hover:bg-on-background hover:text-on-primary"
                }`}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="material-symbols-outlined w-10 h-10 flex items-center justify-center border border-outline-variant hover:bg-on-background hover:text-on-primary transition-all disabled:opacity-40"
          >
            chevron_right
          </button>
        </div>
      )}
    </div>
  );
}
