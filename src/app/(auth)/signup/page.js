'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup successful!");
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('Email already in use.');
          break;
        case 'auth/invalid-email':
          toast.error('Invalid email format.');
          break;
        case 'auth/weak-password':
          toast.error('Password must be at least 6 characters.');
          break;
        default:
          toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4 max-w-sm mx-auto mt-10">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-violet-600 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
}
