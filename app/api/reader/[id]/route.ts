// app/api/reader/[id]/route.ts

import { NextResponse, NextRequest } from "next/server"; 
import  prisma  from '@/lib/prisma';
import { withPermission } from '@/lib/auth/middleware';


export async function GET(
  request: NextRequest,
  {params}:{params: Promise<{id:string}>}){
  const { id } = await params;  

  const check = await (await withPermission('reader: read'))(request, {});
  if(check) return check;
  const reader=await prisma.reader.findUnique({
    where: {id: parseInt(id), deletedAt: null},
    include: {borrows: true, favorites: true}
  });
  if(!reader) return NextResponse.json({success:false, message: 'Reader not found'}, {status: 404});
  return NextResponse.json({ success: true, reader });
}