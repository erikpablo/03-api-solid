import type { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
