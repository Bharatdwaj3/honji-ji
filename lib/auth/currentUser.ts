import { NextRequest } from "next/server";
import { firebaseAuth } from '@/lib/firebase-admin';

export async function getCurrentUser(req?: NextRequest){
    try{
        const authHeader=req?.headers.get('authorization');
        if(!authHeader?.startsWith('Bearer')) return null;
        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await firebaseAuth.verifyIdToken(token);
        return {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name,
            accountType: decodedToken.accountType || 'reader',
        };
    }catch(err){
        return null;
    }
}
