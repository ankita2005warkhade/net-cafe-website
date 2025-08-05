'use client';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await signOut(auth);
      router.push('/login');
    };
    logout();
  }, [router]);

  return (
    <p className="text-center mt-8">Logging out...</p>
  );
}
