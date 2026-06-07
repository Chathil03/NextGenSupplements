import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, Microscope, Target, Users, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-surface min-h-screen pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-on-background">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
           {/* Placeholder for high-end science lab image */}
           <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1532187875605-2fe358a71e48?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-bold text-xs uppercase tracking-widest mb-6">
            Our Philosophy
          </span>
          <h1 className="text-display-lg font-black text-on-primary mb-8 leading-tight">
            PHARMACEUTICAL PRECISION. <br />
            <span className="text-primary italic">HUMAN PERFORMANCE.</span>
          </h1>
          <p className="text-headline-sm text-secondary-fixed-dim max-w-2xl mx-auto leading-relaxed">
            NextGen Supplements was founded on a single premise: that athletes deserve the same standard of precision as medicine.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 px-gutter max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-display-sm font-black text-on-surface">The Science of Uncompromising Results</h2>
          <p className="text-body-lg text-secondary opacity-80 leading-relaxed">
            While most supplement brands prioritize marketing over molecules, we inverse the equation. Every formulation starts in our ISO-certified laboratories, where we benchmark against pharmaceutical standards for purity and bio-availability.
          </p>
          <p className="text-body-lg text-secondary opacity-80 leading-relaxed">
            We don't use 'proprietary blends' as a veil for under-dosed ingredients. We provide full transparency because our science is built to be scrutinized.
          </p>
          <button className="flex items-center gap-3 font-label-bold text-primary group">
             LEARN ABOUT OUR LAB PROCESS
             <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div className="bg-surface-container rounded-3xl p-12 border border-outline-variant relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <Microscope className="w-32 h-32 text-primary" />
            </div>
            <div className="relative z-10 space-y-8">
                <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <Shield className="w-6 h-6 text-on-primary" />
                    </div>
                    <div>
                        <h3 className="text-title-lg font-bold mb-2">Triple-Tested Purity</h3>
                        <p className="text-body-md text-secondary opacity-70">Raw materials are tested before production, during formulation, and after packaging.</p>
                    </div>
                </div>
                <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <Target className="w-6 h-6 text-on-primary" />
                    </div>
                    <div>
                        <h3 className="text-title-lg font-bold mb-2">Clinical Dosages</h3>
                        <p className="text-body-md text-secondary opacity-70">We only use therapeutic quantities backed by peer-reviewed human clinical trials.</p>
                    </div>
                </div>
                <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                        <Users className="w-6 h-6 text-on-primary" />
                    </div>
                    <div>
                        <h3 className="text-title-lg font-bold mb-2">Athlete Driven</h3>
                        <p className="text-body-md text-secondary opacity-70">Every product is field-tested by professional athletes for real-world efficacy.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-display-md font-black text-on-primary mb-8">Ready to evolve?</h2>
            <Link href="/shop" className="inline-block px-12 py-4 bg-on-primary text-primary font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl">
                SHOP THE COLLECTION
            </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
