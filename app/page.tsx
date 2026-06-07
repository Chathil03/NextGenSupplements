import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShopByGoal from "@/components/ShopByGoal";
import BestSellers from "@/components/BestSellers";
import ScienceSection from "@/components/ScienceSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <ShopByGoal />
        <BestSellers />
        <ScienceSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
