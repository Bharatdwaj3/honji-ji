// app/api/writer/route.ts

import { NextResponse, NextRequest } from "next/server"; 
import prisma from '@/lib/prisma';
import { withPermission } from '@/lib/auth/middleware';

export async function GET(request: NextRequest) {
    const check = await (await withPermission('writer:list'))(request, {});
    if (check) return check;

    const writers = await prisma.writer.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, writers });
}