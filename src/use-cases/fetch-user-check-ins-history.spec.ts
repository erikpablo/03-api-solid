import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryChecksInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryChecksInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryChecksInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      user_id: 'user-01',
      gym_Id: 'gym-01',
    })

    await checkInsRepository.create({
      user_id: 'user-01',
      gym_Id: 'gym-02',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-01' }),
      expect.objectContaining({ gym_Id: 'gym-02' }),
    ])
  })

  it('should be able to fetch paginated check-is history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'user-01',
        gym_Id: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_Id: 'gym-21' }),
      expect.objectContaining({ gym_Id: 'gym-22' }),
    ])
  })
})
