// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `var` in TypeScript (prevent re-declaration errors)
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;