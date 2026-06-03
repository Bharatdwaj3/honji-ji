// app/api/auth/logout/route.ts
import { NextResponse, NextRequest } from "next/server"; 
import { firebaseAuth } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      
      // Revoke refresh tokens (forces re-login on next attempt)
      await firebaseAuth.revokeRefreshTokens(decodedToken.uid);
    }

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    // Still return success for client-side cleanup even if token is invalid
    return NextResponse.json({
      success: true,
      message: 'Logged out'
    });
  }
}