import type { FastifyInstance } from 'fastify'
import { register } from './controller/register'
import { authenticate } from './controller/autheticate'

export async function appRouter(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
