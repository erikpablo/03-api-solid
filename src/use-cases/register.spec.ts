import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUserCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUserCase.execute({
      name: 'Erik valdivino',
      email: 'erikv@gmail.com',
      password: '123456',
    })

    const isPasswordHashed = await compare('123456', user.password_hash)
    expect(isPasswordHashed).toBe(true)
  })
})

/**
 * Describe, usado para agrupar testes relacionados.
 * It, usado para definir um teste específico.
 * Expect, usado para fazer asserções sobre o resultado do teste.
 * Vitest é uma biblioteca de testes para JavaScript e TypeScript.
 *
 * como returnamos o user do RegisterUserCase, podemos pushe ele com { user }
 * Dessa forma temos acesso ao password_hash do user
 *
 * compare, usado para comparar a senha fornecida com o hash armazenado.
 *
 * com o expect, verificamos se a senha foi realmente hasheada.
 */
