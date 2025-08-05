import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
    }

    const docRef = doc(db, 'uploads', id);
    await updateDoc(docRef, {
      printed: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mark as printed error:', error);
    return NextResponse.json({ error: 'Failed to mark as printed' }, { status: 500 });
  }
}
