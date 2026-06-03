// lib/prisma.ts
import prisma from './prisma.client';   
const globalForPrisma = globalThis as unknown as {
  prisma: typeof prisma | undefined;
};

export const db = globalForPrisma.prisma ?? prisma;

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

export default db;