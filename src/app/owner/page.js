'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export default function OwnerDashboard() {
  const [owner, setOwner] = useState(null);
  const [files, setFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser?.email === process.env.NEXT_PUBLIC_OWNER_EMAIL) {
        setOwner(loggedInUser);
        fetchAllFiles();
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAllFiles = async () => {
    try {
      const res = await fetch('/api/owner-uploads');
      const data = await res.json();
      if (data.success) {
        setFiles(data.files);
      }
    } catch (error) {
      console.error('Error fetching owner files:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-primary">
        Owner Dashboard – All Uploaded Files
      </h1>

      {files.length === 0 ? (
        <p className="text-center text-gray-500 italic">No files uploaded yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <Card
              key={file.id}
              className="shadow-md transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-lg font-medium">
                  <FileText className="text-blue-500" />
                  {file.fileName.split('_').slice(1).join('_')}
                </div>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 underline hover:text-blue-800"
                >
                  Download / View
                </a>
                <p className="text-sm text-gray-500">
                  Uploaded by: {file.uploadedBy}
                </p>
                <Badge className="capitalize" variant="outline">
                  {file.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
