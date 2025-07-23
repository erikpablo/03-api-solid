import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { CheckIn } from '@prisma/client'

interface CheckInsUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInsUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInsUseCaseRequest): Promise<CheckInsUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      gym_Id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
