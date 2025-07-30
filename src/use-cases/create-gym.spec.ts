import { expect, describe, it } from 'vitest'
import { beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 02',
      description: '',
      phone: '',
      latitude: -27.0747279,
      longitude: -49.4889672,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
