import Link from "next/link";

const shopLinks = ["Protein", "Pre-Workout", "Recovery", "Vitamins"];
const supportLinks = [
  "Contact Us",
  "Shipping & Returns",
  "Wholesale",
  "Help Center",
];
const legalLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Lab Reports",
  "Accessibility",
];

export default function Footer() {
  return (
    <footer className="bg-on-background py-section-padding border-t border-outline/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-gutter max-w-container-max mx-auto">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <Link
            href="/"
            className="font-display-lg text-headline-md text-on-primary mb-6 block"
          >
            NextGen Supplements
          </Link>
          <p className="text-secondary-fixed-dim text-body-md mb-8">
            Engineering human potential through uncompromising science and
            pharmaceutical precision.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-on-primary cursor-pointer hover:text-primary transition-colors hover:-translate-y-1">
              public
            </span>
            <span className="material-symbols-outlined text-on-primary cursor-pointer hover:text-primary transition-colors hover:-translate-y-1">
              share
            </span>
            <span className="material-symbols-outlined text-on-primary cursor-pointer hover:text-primary transition-colors hover:-translate-y-1">
              mail
            </span>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="font-label-bold text-label-bold text-on-primary uppercase mb-6">
            SHOP
          </h4>
          <ul className="space-y-4">
            {shopLinks.map((item) => (
              <li key={item}>
                <Link
                  href={`/shop?category=${item}`}
                  className="text-secondary-fixed-dim hover:text-primary-fixed transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="font-label-bold text-label-bold text-on-primary uppercase mb-6">
            SUPPORT
          </h4>
          <ul className="space-y-4">
            {supportLinks.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-secondary-fixed-dim hover:text-primary-fixed transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-label-bold text-label-bold text-on-primary uppercase mb-6">
            LEGAL
          </h4>
          <ul className="space-y-4">
            {legalLinks.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-secondary-fixed-dim hover:text-primary-fixed transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-container-max mx-auto px-gutter pt-16 border-t border-outline/10 mt-16 text-center">
        <p className="text-secondary-fixed-dim text-body-md opacity-60">
          © 2024 NextGen Supplements. PHARMACEUTICAL GRADE SUPPLEMENTS.
        </p>
      </div>
    </footer>
  );
}
