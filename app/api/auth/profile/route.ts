// app/api/auth/profile/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { firebaseAuth } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth/currentUser';

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);

  if (!user) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    user
  });
}