"use client";

import Link from "next/link";

const navLinks = [
  { label: "SHOP", href: "/shop" },
  { label: "GOALS", href: "/goals" },
  { label: "SCIENCE", href: "/science" },
  { label: "ABOUT", href: "/about" },
];

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant transition-all duration-200 ease-in-out h-20">
      <div className="flex justify-between items-center h-full px-gutter max-w-container-max mx-auto">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="font-display-lg text-headline-md font-black text-primary"
          >
            NextGen Supplements
          </Link>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname?.startsWith(link.href) && link.href !== '/');
              return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-label-bold text-label-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            )})}
          </div>
        </div>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 border border-outline-variant">
            <span className="material-symbols-outlined text-secondary text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Search product..."
              className="bg-transparent border-none focus:ring-0 text-label-sm w-48 outline-none ml-2"
            />
          </div>

          <div className="flex gap-4">
            <button className="hover:bg-surface-container p-2 transition-colors">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <button className="hover:bg-surface-container p-2 transition-colors">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
