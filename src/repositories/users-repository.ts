import type { Prisma, User } from '@prisma/client'

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}

/**
 * Criamos um repositório de usuários que implementa a interface UserRepository.
 * Com isso, ele vai dizer quis metodos devem existir no repositório.
 * Estamos tipando o usersRepository para garantir que ele siga a interface UserRepository.
 *
 * Com isso, passamos os tipos de dados que o Prisma espera receber e retornar
 * e como retornamos uma Promise de User, garantimos que o método create
 * retorne um usuário do tipo User.
 */
