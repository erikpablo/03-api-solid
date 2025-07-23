import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { beforeEach } from 'vitest'
import { InMemoryChecksInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInsUseCase } from './check-in'

let checkInsRepository: InMemoryChecksInsRepository
let sut: CheckInsUseCase

describe('CheckIns Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryChecksInsRepository()
    sut = new CheckInsUseCase(checkInsRepository)
  })

  it('should be able to check ins', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
