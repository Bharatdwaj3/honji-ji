// app/api/book/route.ts

import { NextResponse, NextRequest } from "next/server"; 
import  prisma  from '@/lib/prisma';
import { withPermission } from '@/lib/auth/middleware';
import type { Genre } from '@prisma/client';

export async function GET(request: NextRequest){
    const check = await (await withPermission('book:list'))(request, {});
    if(check) return check;

    try{
        const {searchParams} = new URL(request.url);
        const genre = searchParams.get('genre');
        const search = searchParams.get('search');
        const books = await prisma.book.findMany({
            where: {
                deletedAt: null,
                ...(genre && {genre: {has: genre as Genre}}),
                ...(search && {
                    OR: [
    {name: {contains: search, mode: 'insensitive'}},
    {writer: {Fname: {contains: search, mode: 'insensitive'}}},
    {writer: {Lname: {contains: search, mode: 'insensitive'}}},
]
                })
            },
            include: {writer: true},
            orderBy: {createdAt: 'desc'}
        });
        return NextResponse.json({success: true, books});
    }catch(err){
        return NextResponse.json({success: false, message: 'Failed to fetch books'}, {status: 500});
    }
}

export async function POST(request: NextRequest){
    const check = await (await withPermission('book:create'))(request,{});
    if(check) return check;
    try{
        const body = await request.json();
        const book = await prisma.book.create({data: body});
        return NextResponse.json({success: true, book}, {status:201});
    }catch(error: any){
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}