// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `var` in TypeScript (prevent re-declaration errors)
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error']  // Optionally log database queries for debugging
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;  // Prevent multiple instances in development
}

export default prisma;
