'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to log out.');
    }
  };

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b dark:border-gray-700">
      {/* Left: Logo */}
      <div className="text-xl font-bold">
        <Link href="/">NetCafé</Link>
      </div>

      {/* Right: Links + Theme toggle */}
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/contact-us" className="hover:underline">Contact Us</Link>

        {!user && (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Signup</Link>
          </>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            Logout
          </button>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
