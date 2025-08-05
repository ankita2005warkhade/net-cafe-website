'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b dark:border-gray-700">
      {/* Left: Logo */}
      <div className="text-xl font-bold">
        <Link href="/">NetCafé</Link>
      </div>

      {/* Right: Links + Theme toggle */}
      <div className="flex items-center gap-4">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/contact" className="hover:underline">Contact Us</Link>
        <Link href="/login" className="hover:underline">Login</Link>
        <Link href="/signup" className="hover:underline">Signup</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
