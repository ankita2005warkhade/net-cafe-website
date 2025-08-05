'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function OwnerDashboard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== process.env.NEXT_PUBLIC_OWNER_EMAIL) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Owner Dashboard</h1>
      {/* Your owner-specific logic like file management */}
    </div>
  );
}
