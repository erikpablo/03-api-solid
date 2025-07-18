import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Erik valdivino',
      email: 'erikv@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Erik valdivino',
      email: 'erikv@gmail.com',
      password: '123456',
    })

    const isPasswordHashed = await compare('123456', user.password_hash)
    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'erikv@gmail.com'

    await sut.execute({
      name: 'Erik valdivino',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Erik valdivino',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
