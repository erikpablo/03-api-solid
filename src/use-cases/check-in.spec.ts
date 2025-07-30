import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryChecksInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryChecksInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInsUseCase

describe('CheckIns Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryChecksInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInsUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      description: '',
      phone: '',
      latitude: -27.0747279,
      longitude: -49.4889672,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check ins', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    })

    await expect(() =>
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -27.0747279,
        userLongitude: -49.4889672,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to  on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Gym 02',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() =>
      sut.execute({
        userId: 'user-02',
        gymId: 'gym-02',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
