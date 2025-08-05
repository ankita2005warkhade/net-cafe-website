"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, app } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import UploadForm from "@/components/UploadForm";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UploadPage() {
  const [user, setUser] = useState(null);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUploads(currentUser.email);
      } else {
        setUser(null);
        setUploads([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUploads = async (email) => {
    try {
      const q = query(
        collection(db, "uploads"),
        where("uploadedBy", "==", email)
      );
      const querySnapshot = await getDocs(q);
      const files = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUploads(files);
    } catch (error) {
      console.error("Error fetching uploads:", error);
      toast.error("Failed to load uploaded files");
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Upload Your Files
        </h1>
        {user ? (
          <>
            <UploadForm />
            <h2 className="text-2xl font-semibold mt-10 mb-4">
              Your Uploaded Files
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {uploads.length > 0 ? (
                uploads.map((file) => (
                  <Card
                    key={file.id}
                    className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col space-y-2">
                        <p className="text-lg font-medium truncate">
                          {file.fileName.split("_").slice(1).join("_")}
                        </p>

                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm"
                        >
                          View / Download
                        </a>
                        <Badge variant="secondary" className="w-fit">
                          {file.printed ? "Printed" : "Pending"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500">No files uploaded yet.</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            Please log in to upload and view your files.
          </p>
        )}
      </div>
    </div>
  );
}
