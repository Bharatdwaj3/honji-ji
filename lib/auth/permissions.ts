// lib/auth/permissions.ts

export type Permission = 
  | 'book:read' | 'book:create' | 'book:update' | 'book:delete' | 'book:list'
  | 'writer:read' | 'writer:create' | 'writer:update' | 'writer:delete' | 'writer:list'
  | 'reader:read' | 'reader:create' | 'reader:update' | 'reader:delete' | 'reader:list'
  | 'profile:read' | 'profile:update';

export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    'book:read', 'book:create', 'book:update', 'book:delete', 'book:list',
    'writer:read', 'writer:create', 'writer:update', 'writer:delete', 'writer:list',
    'reader:read', 'reader:create', 'reader:update', 'reader:delete', 'reader:list',
    'profile:read', 'profile:update',
  ],
  writer: [
    'book:read', 'book:create', 'book:update', 'book:delete', 'book:list',
    'writer:read', 'profile:read', 'profile:update',
    'writer:list',
  ],
  reader: [
    'book:read', 'book:list',
    'writer:read', 'writer:list',
    'profile:read', 'profile:update',
  ],
};

// Helper function
export function hasPermission(
  user: any, 
  permission: Permission
): boolean {
  if (!user?.accountType) return false;
  return ROLE_PERMISSIONS[user.accountType]?.includes(permission) || false;
}

// Advanced: Check ownership (e.g., can edit own book)
export function canManageResource(
  user: any, 
  resource: any, 
  resourceType: 'book' | 'writer' | 'reader'
): boolean {
  if (!user) return false;
  if (user.accountType === 'admin') return true;

  if (resourceType === 'book' && user.accountType === 'writer') {
    return resource.writer === user.fullName || resource.writerId === user.id;
  }

  if ((resourceType === 'writer' || resourceType === 'reader') && user.id === resource.id) {
    return true;
  }

  return false;
}