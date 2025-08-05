'use client';

import { useEffect, useState } from 'react';
// import {ThemeToggle} from '@/components/ThemeToggle';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // ✅ fix hydration issue

  useEffect(() => {
    setHasMounted(true); // only render after client hydration
  }, []);

  if (!hasMounted) return null; // ⛔ prevent hydration mismatch

  const handleUpload = async () => {
    if (!file || !email) return toast.error('Please provide email and file.');

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', email);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    setIsUploading(false);

    if (res.ok) {
      toast.success('File uploaded successfully!');
      setEmail('');
      setFile(null);
    } else {
      toast.error('Upload failed.');
    }
  };

  return (
    <div className="min-h-screen p-4 bg-background text-foreground transition-colors duration-500">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upload Your File</h1>
        {/* <ThemeToggle /> */}
      </div>

      <Card className="max-w-md mx-auto shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>File</Label>
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <Button onClick={handleUpload} disabled={isUploading} className="w-full">
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
