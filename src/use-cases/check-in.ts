import type { CheckInsRepository } from '@/repositories/check-ins-repository'
import type { GymRepository } from '@/repositories/gym-repository'
import type { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

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
    userLatitude,
    userLongitude,
  }: CheckInsUseCaseRequest): Promise<CheckInsUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    const MAX_DISTANCE = 0.1 // 100 meters

    if (distance > MAX_DISTANCE) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay = await this.checkInRepository.findByIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
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
