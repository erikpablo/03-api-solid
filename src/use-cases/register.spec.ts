import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUserCase.execute({
      name: 'Erik valdivino',
      email: 'erikv@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUserCase.execute({
      name: 'Erik valdivino',
      email: 'erikv@gmail.com',
      password: '123456',
    })

    const isPasswordHashed = await compare('123456', user.password_hash)
    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'erikv@gmail.com'

    await registerUserCase.execute({
      name: 'Erik valdivino',
      email,
      password: '123456',
    })

    expect(() =>
      registerUserCase.execute({
        name: 'Erik valdivino',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
