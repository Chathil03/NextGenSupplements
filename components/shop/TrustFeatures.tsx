const features = [
  {
    icon: "science",
    title: "Scientifically Formulated",
    description:
      "Every ingredient is backed by peer-reviewed clinical research at efficacious dosages.",
  },
  {
    icon: "verified_user",
    title: "Third-Party Tested",
    description:
      "We test every batch for purity, potency, and the absence of banned substances.",
  },
  {
    icon: "local_shipping",
    title: "Global Rapid Shipping",
    description:
      "Expedited temperature-controlled logistics to preserve compound integrity.",
  },
];

export default function TrustFeatures() {
  return (
    <section className="bg-on-background text-on-primary py-section-padding">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className={`flex flex-col items-center ${
              index === 1
                ? "border-y md:border-y-0 md:border-x border-outline/20 py-12 md:py-0"
                : ""
            }`}
          >
            <span className="material-symbols-outlined text-4xl mb-4 text-primary-fixed-dim">
              {feature.icon}
            </span>
            <h3 className="font-label-bold text-label-bold uppercase mb-2">
              {feature.title}
            </h3>
            <p className="text-secondary-fixed-dim text-body-md">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
