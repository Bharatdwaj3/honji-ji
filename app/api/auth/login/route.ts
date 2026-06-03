// app/api/auth/login/route.ts
import { NextResponse, NextRequest } from "next/server"; 
import { firebaseAuth } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ success: false, message: 'ID Token required' }, { status: 400 });
    }

    const decodedToken = await firebaseAuth.verifyIdToken(idToken);

    return NextResponse.json({
      success: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
      },
      message: 'Login successful'
    });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
}