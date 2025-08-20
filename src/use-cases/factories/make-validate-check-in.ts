import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const userCase = new ValidateCheckInUseCase(prismaCheckInsRepository)

  return userCase
}
