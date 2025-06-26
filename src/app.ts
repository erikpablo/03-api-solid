import fastify from 'fastify'
import { appRouter } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRouter)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: enviar para um serviço de monitoramento tool datadog/newRelic
  }

  reply.status(500).send({
    message: 'Internal server error',
  })
})

/**
 * Criamos o app.setErrorHandler() para tratar erros de forma global
 * recendo um funcao que recebe o error e o request e reply
 *
 * zodError é um erro que vem do zod, quando o zod da erro na validação
 * error.format(), do zod, retorna o erro de forma mais amigavel
 *
 * Podemos user o env para tratar o erro caso seja desconhecido
 *
 */
