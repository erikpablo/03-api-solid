import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { GymRepository } from '@/repositories/gym-repository'
import type { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInsUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInsUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInsUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymRepository
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInsUseCaseRequest): Promise<CheckInsUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const checkInOnSameDay = await this.checkInRepository.findByIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      gym_Id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
