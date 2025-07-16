export class UserAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}

/**
 * extends o Error para criar uma classe de erro personalizada
 * O super é do error
 * Dessa forma, podemos lançar esse erro em qualquer lugar do código
 * sendo o específico para o caso de usuário já existir
 *
 */
