"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // adjust path if needed
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  // listen for auth changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMobileOpen(false);
      router.push("/login");
    } catch (err) {
      console.error("Logout error", err);
      // add toast/message if you like
    }
  };

  const isLoggedIn = !!user;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-black border-b dark:border-zinc-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold mr-6">
              <span className="text-primary dark:text-primary-light">NetCafé</span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">Home</Link>
            <Link href="/about" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">About</Link>
            <Link href="/contact-us" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">Contact Us</Link>

            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
                <Link href="/signup" className="px-3 py-2 rounded border">Sign Up</Link>
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Login</Link>
                <Link href="/signup" className="px-3 py-2 rounded border">Sign Up</Link>
              </>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen((s) => !s)} aria-label="Toggle menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t dark:border-zinc-800">
          <div className="px-4 py-4 space-y-2">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">Home</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">About</Link>
            <Link href="/contact-us" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800">Contact Us</Link>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded bg-red-600 text-white"
                >
                  Logout
                </button>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded border">Sign Up</Link>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded bg-blue-600 text-white">Login</Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded border">Sign Up</Link>
              </>
            )}

            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
