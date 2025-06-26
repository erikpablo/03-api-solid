import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUserCase = new RegisterUseCase(prismaUsersRepository)

    await registerUserCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
  return reply.status(201).send()
}

/**
 * Camo estamos pegando somente error conhecido, se for outro erro, retornamos 500
 * Porem, é bom, mais usamos o thow new Error('') para erros desconhecidos
 * Dessa forma se o error nao foi conhecido nao quero trata ele
 * e quero que o fastify trate ele
 *
 * Dessa forma vamos cria um error handler
 */
