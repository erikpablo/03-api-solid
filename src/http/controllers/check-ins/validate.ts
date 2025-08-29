import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-in'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInsParamsSchema.parse(request.params)

  const validateCheckIns = makeValidateCheckInsUseCase()

  await validateCheckIns.execute({
    checkInId,
  })

  return reply.status(204).send()
}
