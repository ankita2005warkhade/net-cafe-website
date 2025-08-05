'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;
      toast.success('Login successful!');

      // Redirect based on role
      if (userEmail === process.env.NEXT_PUBLIC_OWNER_EMAIL) {
        router.push('/owner'); // Redirect to owner dashboard
      } else {
        router.push('/upload'); // Redirect to user upload dashboard
      }

    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow bg-white dark:bg-gray-900 space-y-4">
      <h1 className="text-2xl font-semibold text-center">Login</h1>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin} disabled={loading} className="w-full">
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </div>
  );
}
