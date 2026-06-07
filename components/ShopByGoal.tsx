import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Goal } from "@/lib/types";

export default async function ShopByGoal() {
  const { data: goals, error } = await supabase
    .from("goals")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !goals?.length) {
    return null;
  }

  const [primary, ...rest] = goals as Goal[];

  return (
    <section className="py-section-padding px-gutter max-w-container-max mx-auto">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="font-label-bold text-label-bold text-primary uppercase tracking-widest mb-2 block">
            Objectives
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background uppercase">
            Shop by Goal
          </h2>
        </div>
        <div className="h-px flex-grow mx-8 bg-outline-variant hidden md:block" />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[600px]">
        {/* Primary Goal — Large Card */}
        {primary && (
          <div className="md:col-span-7 relative group overflow-hidden bg-on-background">
            <Image
              src={primary.image_url}
              alt={primary.image_alt}
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/90 to-transparent flex flex-col justify-end p-8">
              <h3 className="font-headline-md text-headline-md text-on-primary uppercase mb-2">
                {primary.title}
              </h3>
              <p className="text-secondary-fixed-dim mb-4 max-w-md">
                {primary.description}
              </p>
              <Link
                href={`/goals/${primary.slug}`}
                className="text-primary font-label-bold text-label-bold uppercase flex items-center gap-2 group/link"
              >
                Explore {primary.title}{" "}
                <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* Right Column: remaining goals */}
        <div className="md:col-span-5 grid grid-rows-2 gap-6">
          {rest.map((goal) => (
            <div key={goal.id} className="relative group overflow-hidden bg-on-background">
              <Image
                src={goal.image_url}
                alt={goal.image_alt}
                fill
                className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/90 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-headline-md text-headline-md text-on-primary uppercase mb-1">
                  {goal.title}
                </h3>
                <Link
                  href={`/goals/${goal.slug}`}
                  className="text-primary font-label-bold text-label-bold uppercase flex items-center gap-2 group/link"
                >
                  View Products{" "}
                  <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
