import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function GoalsPage() {
  const supabase = createClient();
  const { data: goals } = await supabase.from('goals').select('*').order('id', { ascending: true });

  return (
    <div className="bg-surface min-h-screen pt-20">
      <Navbar />
      
      {/* Header */}
      <section className="py-24 px-gutter max-w-container-max mx-auto text-center">
        <span className="text-primary font-label-bold text-xs uppercase tracking-[0.3em] mb-4 block">Engineered Outcomes</span>
        <h1 className="text-display-lg font-black text-on-surface mb-8">What is your <span className="text-primary italic">objective?</span></h1>
        <p className="text-body-lg text-secondary max-w-2xl mx-auto opacity-80">
          Our systems are categorized by physiological outcome. Select your primary goal to see the recommended pharmaceutical-grade stack.
        </p>
      </section>

      {/* Goals Grid */}
      <section className="px-gutter pb-32 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {goals?.map((goal) => (
            <Link 
              key={goal.id} 
              href={`/shop?category=${goal.title}`}
              className="group relative h-[600px] rounded-3xl overflow-hidden bg-on-background shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-60 group-hover:opacity-40 transition-opacity duration-700">
                <img 
                  src={goal.image_url} 
                  alt={goal.image_alt} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 p-10 w-full">
                <h3 className="text-display-sm font-black text-white italic uppercase mb-4 group-hover:text-primary transition-colors">
                  {goal.title}
                </h3>
                <p className="text-body-md text-slate-300 mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 line-clamp-2">
                  {goal.description}
                </p>
                <div className="flex items-center gap-3 text-white font-label-bold group-hover:gap-6 transition-all duration-300">
                  EXPLORE PROTOCOL
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
