import { NextResponse } from 'next/server';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    // Fetch ALL uploads sorted by timestamp (newest first)
    const uploadsRef = collection(db, 'uploads');
    const q = query(uploadsRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    const files = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, files });
  } catch (error) {
    console.error('Error fetching owner uploads:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch uploads' }, { status: 500 });
  }
}
