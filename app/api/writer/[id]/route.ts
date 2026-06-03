// app/api/writer/[id]/route.ts

import { NextResponse, NextRequest } from "next/server"; 
import  prisma  from '@/lib/prisma';
import { withPermission } from '@/lib/auth/middleware';

export async function GET(
  request: NextRequest,
  {params}:{params: Promise<{id:string}>}){
  const { id } = await params;  
 const check = await (await withPermission('writer:read'))(request, {});
  if(check) return check;
  const writer=await prisma.writer.findUnique({
    where: {id: parseInt(id), deletedAt: null},
    include: {books: true}
  });
  if(!writer) return NextResponse.json({success:false, message: 'Writer not found'}, {status: 404});
  return NextResponse.json({ success: true, writer });
}