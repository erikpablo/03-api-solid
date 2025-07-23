import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, describe, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { invalidCredentialsError } from './errors/invalid-credentials-error'
import { beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Erik Pablo',
      email: 'erikv@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'erikv@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'erikv@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(invalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Erik Pablo',
      email: 'erikv@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'erikv@gmail.com',
        password: '1234567',
      })
    ).rejects.toBeInstanceOf(invalidCredentialsError)
  })
})
