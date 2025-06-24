import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import type { UserRepository } from '../users-repository'

export class PrismaUsersRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}

/**
 * Como no user eu preciso que tenha o create,
 * então eu implemento o método create
 *
 * Contro ., para implementar o método findByEmail ou de qualquer que tenha na interface
 */
