// app/api/book/[id]/route.ts

import { NextResponse, NextRequest } from "next/server"; 
import prisma from '@/lib/prisma';
import {withPermission} from '@/lib/auth/middleware';

export async function GET(
  request: NextRequest,
  {params}:{params: Promise<{id:string}>}){
  const { id } = await params;  
  const check = await (await withPermission('book: read'))(request, {});
    
    if(check) return check;

    const book=await prisma.book.findUnique({
        where: {id: parseInt(id), deletedAt: null},
        include: {writer: true}
    });
    if(!book) return NextResponse.json({success: false, message: 'Book not found'},{ status:404});
    return NextResponse.json({success: true, book});
}
export async function PUT(
  request: NextRequest,
  {params}:{params: Promise<{id:string}>}){
  const { id } = await params;  
const book = await prisma.book.findUnique({where: {id: parseInt((await params).id)}});
    const check = await (await withPermission('book: update', 'book'))(request, {resource: book});
    if(check) return check;

    const body = await request.json();
    const updated = await prisma.book.update({
        where: {id: parseInt(id)},
        data: body
    });
    return NextResponse.json({success: true, book:updated});
}

export async function DELETE(
  request: NextRequest,
  {params}:{params: Promise<{id:string}>}){
  const { id } = await params;   const book = await prisma.book.findUnique({ where: { id: parseInt((await params).id) } });
  const check = await (await withPermission('book:delete', 'book'))(request, { resource: book });
  if (check) return check;

  await prisma.book.update({
    where: { id: parseInt(id) },
    data: { deletedAt: new Date() }
  });

  return NextResponse.json({ success: true, message: 'Book deleted' });
}