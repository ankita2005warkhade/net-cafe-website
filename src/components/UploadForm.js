'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please select a file to upload.');
    if (!email) return toast.error('Please enter your email.');

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      let result;

      // Safely try to parse JSON, fallback to text if HTML error is returned
      try {
        result = await res.json();
      } catch {
        const text = await res.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server error – invalid response format');
      }

      if (!res.ok) {
        return toast.error(result?.error || 'Upload failed.');
      }

      if (result.success) {
        toast.success('File uploaded successfully!');
        setFile(null);
        setEmail('');
      } else {
        toast.error(result.error || 'Upload failed.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-lg bg-white dark:bg-zinc-900">
      <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-white">Upload File</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-md dark:bg-zinc-800 dark:text-white"
          required
        />
        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border rounded-md dark:bg-zinc-800 dark:text-white"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
