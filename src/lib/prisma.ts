import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

/**
 * Com o query,
 * podemos ver todos os query que o prisma realiza por debaixo dos panos
 */
