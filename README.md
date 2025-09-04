# GymPass Style API

Este projeto é uma API inspirada no modelo GymPass, desenvolvida com Node.js, TypeScript e Fastify. Ela permite o gerenciamento de academias, usuários, check-ins e autenticação, com regras de negócio robustas e testes automatizados.

## 📚 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Regras de Negócio](#regras-de-negócio)
- [Requisitos Não Funcionais](#requisitos-não-funcionais)
- [Como Rodar](#como-rodar)
- [Testes](#testes)
- [O que Aprendi](#o-que-aprendi)

---

## Sobre o Projeto

A API permite que usuários se cadastrem, realizem check-ins em academias próximas, busquem academias por nome ou localização, validem check-ins e gerenciem seu histórico. Administradores podem cadastrar academias e validar check-ins de usuários.

---

## Estrutura de Pastas

```
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── @types/
│   ├── env/
│   ├── http/
│   │   └── controllers/
│   │   └── middlewares/
│   ├── lib/
│   ├── repositories/
│   ├── use-cases/
│   └── utils/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .github/
│   └── workflows/
├── .env.example
├── package.json
├── README.md
└── docker-compose.yml
```

---

## Tecnologias Utilizadas

- **Node.js** & **TypeScript**
- **Fastify** (API HTTP)
- **Prisma ORM** (Banco de dados PostgreSQL)
- **JWT** (Autenticação)
- **Zod** (Validação de dados)
- **Vitest** & **Supertest** (Testes unitários e e2e)
- **Docker** (Banco de dados em container)
- **ESLint** & **Prettier** (Padronização de código)

---

## Funcionalidades

- Cadastro e autenticação de usuários
- Perfil do usuário logado
- Histórico e métricas de check-ins
- Busca de academias por nome e localização
- Realização e validação de check-ins
- Cadastro de academias (admin)
- Paginação de resultados

---

## Regras de Negócio

- Não permite cadastro com e-mail duplicado
- Usuário só pode fazer um check-in por dia
- Check-in só permitido se estiver a até 100m da academia
- Check-in só pode ser validado até 20 minutos após criação
- Apenas administradores podem validar check-ins e cadastrar academias

---

## Requisitos Não Funcionais

- Senha criptografada com bcryptjs
- Persistência dos dados em PostgreSQL
- Listagens paginadas (20 itens por página)
- Autenticação via JWT

---

## Como Rodar

1. Clone o repositório
2. Configure o `.env` conforme o `.env.example`
3. Suba o banco de dados com Docker:
   ```sh
   docker-compose up -d
   ```
4. Instale as dependências:
   ```sh
   npm install
   ```
5. Rode as migrations do Prisma:
   ```sh
   npx prisma migrate deploy
   ```
6. Inicie o servidor:
   ```sh
   npm run dev
   ```

---

## Testes

- Testes unitários:
  ```sh
  npm test
  ```
- Testes end-to-end:
  ```sh
  npm run test:e2e
  ```
- Cobertura:
  ```sh
  npm run test:coverage
  ```

---

## O que Aprendi

- Implementação de autenticação JWT com Fastify
- Criação de middlewares para autorização por papel (admin/member)
- Utilização do Prisma para modelagem e manipulação de dados relacionais
- Validação de dados com Zod
- Testes automatizados (unitários e e2e) com Vitest e Supertest
- Paginação eficiente e busca geolocalizada
- Boas práticas de arquitetura (use-cases, repositories, factories)
- Configuração de CI/CD com GitHub Actions

---

## Autor

Erik Nunes

---

## Licença

MIT