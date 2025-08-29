import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetrics = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetrics.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
