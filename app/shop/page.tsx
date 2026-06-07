import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopHero from "@/components/shop/ShopHero";
import ShopSidebar from "@/components/shop/ShopSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import TrustFeatures from "@/components/shop/TrustFeatures";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Supplements | NextGen Supplements",
  description:
    "Precision-engineered pharmaceutical grade supplements designed for athletes who refuse to settle.",
};

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ShopHero />
        <section className="max-w-container-max mx-auto px-gutter py-12 flex flex-col md:flex-row gap-12">
          <ShopSidebar />
          <ProductGrid category={searchParams.category} />
        </section>
        <TrustFeatures />
      </main>
      <Footer />
    </>
  );
}
