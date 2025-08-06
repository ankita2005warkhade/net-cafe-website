'use client';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { FileText, BadgeCheck } from 'lucide-react';

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [userUploads, setUserUploads] = useState([]);

  // Track login status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
        setEmail(loggedInUser.email);
        fetchUserUploads(loggedInUser.email);
      } else {
        setUser(null);
        setUserUploads([]);
        setEmail('');
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserUploads = async (email) => {
    try {
      const res = await fetch(`/api/user-uploads?email=${email}`);
      const data = await res.json();
      if (data.success) {
        setUserUploads(data.files);
      }
    } catch (error) {
      console.error('Error fetching uploads:', error);
    }
  };

  const handleUpload = async () => {
    if (!file || (!user && !email)) {
      return toast.error('Please provide email and file.');
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', user ? user.email : email);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success('File uploaded successfully!');
        setFile(null);
        if (user) fetchUserUploads(user.email);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">Welcome to NetCafé</h1>

      {/* Upload Section */}
      <Card className="shadow-lg">
        <CardContent className="p-6 space-y-4">
          {!user && (
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          <div>
            <Label>File</Label>
            <Input
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <Button
            onClick={handleUpload}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </CardContent>
      </Card>

      {/* Show previous uploads only if logged in */}
      {user && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Uploaded Files</h2>
          {userUploads.length === 0 ? (
            <p className="text-gray-500 italic">No files uploaded yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {userUploads.map((upload) => (
                <Card
                  key={upload.id}
                  className="transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl"
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-lg font-medium">
                      <FileText className="text-blue-500" />{' '}
                      {upload.fileName.split('_').slice(1).join('_')}
                    </div>
                    <a
                      href={upload.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      Download / View
                    </a>
                    <div className="flex items-center text-green-600 gap-1 text-sm">
                      <BadgeCheck size={16} /> {upload.status}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

