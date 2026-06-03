// app/api/reader/route.ts

import { NextResponse, NextRequest } from "next/server"; 
import  prisma  from "@/lib/prisma";
import { withPermission } from '@/lib/auth/middleware';

export async function GET(request: NextRequest){
    const check = await (await  withPermission('reader:list'))(request, {});
    if (check) return check;
    const readers = await prisma.reader.findMany({
        where : {deletedAt: null},
        orderBy: {createdAt: 'desc'}
});
    return NextResponse.json({success: true, readers});
}
