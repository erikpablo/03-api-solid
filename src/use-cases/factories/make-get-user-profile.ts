import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUse } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const userCase = new GetUserProfileUse(prismaUsersRepository)

  return userCase
}
