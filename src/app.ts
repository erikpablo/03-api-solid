import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/users', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return reply.status(201).send()
})

/**
 * Criamos uma pasta para a conexao do banco
 * exportamos para dentro do appp
 *
 * no appp
 *
 * criamos a rota para cria usuarios
 * onde o zod ira validar os dados, e o o prisma.user.create, criamos
 * o usuario.
 * retornamos o 201
 *
 * e pór meio do insominia criamos o user.
 * e pelo prisma studio podemos ver.
 */
