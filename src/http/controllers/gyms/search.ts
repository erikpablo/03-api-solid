import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymsQuerySchema.parse(request.body)

  const searchGyms = makeSearchGymsUseCase()

  const { gyms } = await searchGyms.execute({ query: q, page })

  return reply.status(200).send({
    gyms,
  })
}
