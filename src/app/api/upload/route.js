import { NextResponse } from 'next/server';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';

// Handle GET request to test API route
export async function GET() {
  return NextResponse.json({ message: 'Upload endpoint is working!' });
}

// Handle POST file upload
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const email = formData.get('email');

    if (!file || !email) {
      return NextResponse.json({ error: 'Missing file or email' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `uploads/${filename}`);

    await uploadBytes(storageRef, buffer);
    const downloadURL = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'uploads'), {
      uploadedBy: email,
      fileName: filename,
      url: downloadURL,
      status: 'pending',
      timestamp: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
