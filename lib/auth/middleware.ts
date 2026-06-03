// lib/auth/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import  { getCurrentUser }  from './currentUser';
import { hasPermission, canManageResource } from './permissions';

export async function withPermission(
  permission: string, 
  resourceType?: 'book' | 'writer' | 'reader'
) {
return async (request: NextRequest, context: any = {}) => {
    const user = await getCurrentUser(request); 
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    if (!hasPermission(user, permission as any)) {
      return NextResponse.json({ success: false, message: 'Insufficient permissions' }, { status: 403 });
    }

    if (context.resource && resourceType) {
      if (!canManageResource(user, context.resource, resourceType)) {
        return NextResponse.json({ success: false, message: 'Access denied to resource' }, { status: 403 });
      }
    }

    (request as any).user = user;
    return null; 
  };
}