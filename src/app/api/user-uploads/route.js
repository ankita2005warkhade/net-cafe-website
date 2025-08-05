import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ success: false, error: 'Missing email' }, { status: 400 });
  }

  try {
    const q = query(collection(db, 'uploads'), where('uploadedBy', '==', email));
    const snapshot = await getDocs(q);

    const files = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, files });
  } catch (error) {
    console.error('Fetch user uploads error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch uploads' }, { status: 500 });
  }
}
