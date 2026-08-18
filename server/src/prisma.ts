import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma — critical for serverless environments.
// Without this, each function invocation creates a new PrismaClient,
// exhausting database connection pools quickly.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

// Only cache the instance in development to allow hot-reload without
// creating new connections on each file save.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
