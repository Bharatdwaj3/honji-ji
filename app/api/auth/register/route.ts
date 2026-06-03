// app/api/auth/register/route.ts
import { NextResponse, NextRequest } from "next/server"; 
import { firebaseAuth } from '@/lib/firebase-admin';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  accountType: z.enum(['reader', 'writer']),
  age: z.number().int().min(1).max(120),
  gender: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName, accountType, age, gender } = registerSchema.parse(body);

    const userRecord = await firebaseAuth.createUser({
      email,
      password,
      displayName: fullName,
    });

    if (accountType === 'reader') {
      await prisma.reader.create({
       data: {
  email,
  Fname: fullName.split(' ')[0],
  Lname: fullName.split(' ').slice(1).join(' ') || '',
  age,
  gender,
},
      });
    } else {
      await prisma.writer.create({
       data: {
  email,
  Fname: fullName.split(' ')[0],
  Lname: fullName.split(' ').slice(1).join(' ') || '',
  age,
  gender,
},
      });
    }

    return NextResponse.json({
      success: true,
      uid: userRecord.uid,
      message: 'Account created successfully'
    });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 400 });
  }
}