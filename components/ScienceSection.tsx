import Image from "next/image";

const qualityPoints = [
  {
    icon: "lab_research",
    title: "In-House Labs",
    description: "Verified potency",
  },
  {
    icon: "verified",
    title: "GMP Certified",
    description: "Elite manufacturing",
  },
  {
    icon: "science",
    title: "3rd Party Tested",
    description: "Zero banned subs",
  },
  {
    icon: "biotech",
    title: "Clinical Dosing",
    description: "Effective amounts",
  },
];

export default function ScienceSection() {
  return (
    <section className="py-section-padding px-gutter max-w-container-max mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="relative">
          <div className="bg-surface-container-highest p-12 relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-on-background uppercase mb-6">
              Science-Backed Quality
            </h2>
            <p className="font-body-md text-secondary mb-8 leading-relaxed">
              Every batch of APEX supplements undergoes a rigorous 4-step
              verification process. We don&apos;t just follow industry
              standards—we set them. From raw material purity to finished
              product potency, we ensure every scoop is worthy of your
              ambition.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {qualityPoints.map((point) => (
                <div key={point.title} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    {point.icon}
                  </span>
                  <div>
                    <h4 className="font-label-bold text-label-bold text-on-background uppercase">
                      {point.title}
                    </h4>
                    <p className="text-label-sm text-secondary">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative border */}
          <div className="absolute -top-6 -right-6 w-full h-full border-4 border-primary/20 -z-0 hidden lg:block" />
        </div>

        {/* Lab Image */}
        <div className="relative aspect-video lg:aspect-square">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_qXK70FpBukzhG4LPjhA69f_gkDGdqpbWN5OoySn4_g34adpWSWVIQPBpdluSoOJOyzBcgC_ODzAkabS4kXnxd433WW_SeRfjSGfqmGIUp22kuZofUwgrhvKmuJrrf0FtNEcgFBuBye59lryiVkzh8H0rG331GgpVcakGsMpJvfMsq4QJjXzMv21qM-nl0pOuhBTxeA03m40xZMkVNNPK0gY68dbxZeuDuMvwaUhwqERdvokGuzcLUOEIVzB0abh8QvMe0ptO_vk"
            alt="High-tech supplement research laboratory"
            fill
            className="object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}
