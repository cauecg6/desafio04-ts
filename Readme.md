# Dio Bank API

API REST simples desenvolvida em **Node.js + Express + TypeScript**, como parte do desafio de projeto "Desenvolvendo o Dio Bank" da [DIO](https://www.dio.me/). O projeto simula o cadastro, a listagem e a remoção de usuários de um banco digital fictício.

Projeto original criado por [Nathally Souza](https://github.com/nathyts), evoluído aqui com a implementação dos desafios propostos.

### Tecnologias

- Node.js
- TypeScript
- Express
- Jest (testes unitários)

### Arquitetura

O projeto segue uma separação em camadas:

- **`src/routes.ts`** — define os endpoints e liga cada rota ao método correspondente do controller.
- **`src/controllers`** — recebe a requisição HTTP (`Request`/`Response`), valida os dados de entrada e decide o status code da resposta.
- **`src/services`** — contém a regra de negócio (criar, listar e remover usuários) e o "banco de dados" (um array em memória).
- **`src/__mocks__`** — helpers para simular `Request`/`Response` do Express nos testes, sem precisar de um servidor real.

## Desafios

- [x] Incluir os testes unitários pendentes no controller
  - [x] Verificar a resposta de erro caso o usuário não informe o `name`
  - [x] Verificar se a função `getAllUsers` está sendo chamada
- [x] Implementar uma validação para o campo `email`
  - [x] O usuário não pode ser criado caso não informe o email
  - [x] Escrever o teste unitário (feito antes da implementação, seguindo TDD)
- [x] Refatorar e implementar a rota para deletar o usuário
  - [x] Refatorar a rota para deletar usuários
  - [x] Escrever os testes unitários necessários

## Rotas da API

### `POST /user`

Cria um novo usuário.

**Body esperado:**
```json
{
  "name": "Nathally",
  "email": "nathally@dio.com"
}
```

**Respostas possíveis:**
| Status | Situação | Body |
|--------|----------|------|
| 201 | Usuário criado com sucesso | `{ "message": "Usuário criado" }` |
| 400 | Campo `name` não informado | `{ "message": "Bad request! Name obrigatório" }` |
| 400 | Campo `email` não informado | `{ "message": "Bad request! Email obrigatório" }` |

### `GET /user`

Lista todos os usuários cadastrados.

**Resposta:**
| Status | Body |
|--------|------|
| 200 | Array de usuários: `[{ "name": "...", "email": "..." }]` |

### `DELETE /user`

Remove um usuário existente, identificado pelo **email** (escolhido como identificador em vez do `name`, pois o `name` pode se repetir entre usuários diferentes, enquanto o email é único).

**Body esperado:**
```json
{
  "email": "nathally@dio.com"
}
```

**Respostas possíveis:**
| Status | Situação | Body |
|--------|----------|------|
| 200 | Usuário removido com sucesso | `{ "message": "Usuário deletado" }` |
| 400 | Campo `email` não informado | `{ "message": "Bad request! Email obrigatório" }` |
| 404 | Nenhum usuário encontrado com esse email | `{ "message": "Usuário não encontrado" }` |

## Exemplos de requisição (curl)

```bash
# Criar usuário
curl -X POST http://localhost:5000/user \
  -H "Content-Type: application/json" \
  -d '{"name":"Nathally","email":"nathally@dio.com"}'

# Listar usuários
curl http://localhost:5000/user

# Deletar usuário
curl -X DELETE http://localhost:5000/user \
  -H "Content-Type: application/json" \
  -d '{"email":"nathally@dio.com"}'
```

## Como rodar o projeto

1. Clone o repositório
   ```bash
   git clone https://github.com/cauecg6/desafio04-ts.git
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Execute o projeto em modo desenvolvimento (porta `5000`)
   ```bash
   npm run dev
   ```

## Como rodar os testes

```bash
# Roda toda a suíte de testes
npm test

# Roda os testes com relatório de cobertura
npx jest --coverage
```

## Aprendizados

Este projeto foi uma boa introdução prática a conceitos essenciais de back-end:

- **Express**: como criar rotas, ler o corpo (`body`) de uma requisição e devolver respostas HTTP com o status code correto.
- **Separação em camadas (controller/service)**: o controller cuida da parte "HTTP" (validar entrada, montar resposta), enquanto o service cuida da regra de negócio. Isso deixa o código mais fácil de testar e de entender.
- **Status codes HTTP**: usar o código certo para cada situação (`200` sucesso, `201` recurso criado, `400` erro do cliente/dados inválidos, `404` recurso não encontrado).
- **Testes unitários com Jest**: escrever testes que verificam o comportamento de uma função isoladamente (`describe`, `it`, `expect`).
- **Mocks**: simular objetos como `Request`, `Response` e o próprio `UserService`, para testar o controller sem depender de um servidor HTTP real ou de um banco de dados de verdade (`jest.fn()`, `Partial<T>`).
- **TDD (Test-Driven Development)**: escrever primeiro o teste que falha (red), depois o código mínimo para ele passar (green). Isso ajuda a garantir que a implementação realmente atende ao comportamento esperado, e fica registrado no histórico de commits do projeto.
