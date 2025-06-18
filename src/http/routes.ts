import type { FastifyInstance } from 'fastify'
import { register } from './controller/register'

export async function appRouter(app: FastifyInstance) {
  app.post('/users', register)
}
