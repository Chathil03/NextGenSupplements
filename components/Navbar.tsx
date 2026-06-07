"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { LayoutDashboard, LogIn, LogOut, User } from "lucide-react";

const navLinks = [
  { label: "SHOP", href: "/shop" },
  { label: "GOALS", href: "/goals" },
  { label: "SCIENCE", href: "/science" },
  { label: "ABOUT", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(profile?.role === 'admin' || profile?.role === 'staff');
      } else {
        setIsAdmin(false);
      }
    }
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUser();
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

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

            {isAdmin && (
              <Link
                href="/admin"
                className="font-label-bold text-label-bold uppercase tracking-wider text-blue-600 hover:text-blue-500 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Portal
              </Link>
            )}
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

          <div className="flex gap-4 items-center">
            <button className="hover:bg-surface-container p-2 transition-colors">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-surface-container transition-colors text-rose-600"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" className="hover:bg-surface-container p-2 transition-colors border border-outline-variant px-4 rounded font-label-bold text-xs flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
