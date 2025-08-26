import type { FastifyInstance } from 'fastify'
import { register } from './controller/register'
import { authenticate } from './controller/authenticate'
import { profile } from './controller/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRouter(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
