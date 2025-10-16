# Requisições para Teste - Aluno

Base URL: `http://localhost:8080`

## 1. Cadastro de Aluno

**Endpoint:** `POST /api/alunos/cadastro`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "login": "joao.silva",
  "senha": "senha123",
  "nome": "João da Silva",
  "email": "joao.silva@example.com",
  "cpf": "12345678901",
  "rg": "123456789",
  "endereco": "Rua das Flores, 123, Bairro Centro, São Paulo - SP"
}
```

**cURL:**
```bash
curl -X POST http://localhost:8080/api/alunos/cadastro \
  -H "Content-Type: application/json" \
  -d '{
    "login": "joao.silva",
    "senha": "senha123",
    "nome": "João da Silva",
    "email": "joao.silva@example.com",
    "cpf": "12345678901",
    "rg": "123456789",
    "endereco": "Rua das Flores, 123, Bairro Centro, São Paulo - SP"
  }'
```

**Resposta Esperada:** `201 Created`
```json
{
  "id": 1,
  "login": "joao.silva",
  "nome": "João da Silva",
  "email": "joao.silva@example.com",
  "cpf": "12345678901",
  "rg": "123456789",
  "endereco": "Rua das Flores, 123, Bairro Centro, São Paulo - SP",
  "saldoMoedas": 0
}
```

---

## 2. Login de Aluno

**Endpoint:** `POST /api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "login": "joao.silva",
  "senha": "senha123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "login": "joao.silva",
    "senha": "senha123"
  }'
```

**Resposta Esperada:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "ALUNO",
  "id": 1,
  "nome": "João da Silva"
}
```

---

## 3. Consultar Dados do Aluno (Autenticado)

**Endpoint:** `GET /api/alunos/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**cURL:**
```bash
curl -X GET http://localhost:8080/api/alunos/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta Esperada:** `200 OK`
```json
{
  "id": 1,
  "login": "joao.silva",
  "nome": "João da Silva",
  "email": "joao.silva@example.com",
  "cpf": "12345678901",
  "rg": "123456789",
  "endereco": "Rua das Flores, 123, Bairro Centro, São Paulo - SP",
  "saldoMoedas": 0
}
```

---

## 4. Consultar Saldo

**Endpoint:** `GET /api/alunos/{id}/saldo`

**Headers:**
```
Authorization: Bearer {token}
```

**cURL:**
```bash
curl -X GET http://localhost:8080/api/alunos/1/saldo \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resposta Esperada:** `200 OK`
```json
{
  "saldo": 0
}
```

---

## Exemplos de Teste com Dados Diferentes

### Aluno 2
```json
{
  "login": "maria.santos",
  "senha": "maria456",
  "nome": "Maria dos Santos",
  "email": "maria.santos@example.com",
  "cpf": "98765432100",
  "rg": "987654321",
  "endereco": "Avenida Paulista, 1000, São Paulo - SP"
}
```

### Aluno 3
```json
{
  "login": "pedro.oliveira",
  "senha": "pedro789",
  "nome": "Pedro Oliveira",
  "email": "pedro.oliveira@example.com",
  "cpf": "11122233344",
  "rg": "111222333",
  "endereco": "Rua Augusta, 500, Consolação, São Paulo - SP"
}
```

---

## Validações a Testar

### Cadastro com dados inválidos

**Login muito curto:**
```json
{
  "login": "ab",
  "senha": "senha123",
  "nome": "Teste",
  "email": "teste@example.com",
  "cpf": "12345678901",
  "rg": "123456789",
  "endereco": "Rua Teste, 123"
}
```
**Erro esperado:** `400 Bad Request` - "Login deve ter entre 3 e 100 caracteres"

**Senha muito curta:**
```json
{
  "login": "teste",
  "senha": "123",
  "nome": "Teste",
  "email": "teste@example.com",
  "cpf": "12345678901",
  "rg": "123456789",
  "endereco": "Rua Teste, 123"
}
```
**Erro esperado:** `400 Bad Request` - "Senha deve ter no mínimo 6 caracteres"

**Email inválido:**
```json
{
  "login": "teste",
  "senha": "senha123",
  "nome": "Teste",
  "email": "email-invalido",
  "cpf": "12345678901",
  "rg": "123456789",
  "endereco": "Rua Teste, 123"
}
```
**Erro esperado:** `400 Bad Request` - "Email deve ser válido"

**CPF com tamanho incorreto:**
```json
{
  "login": "teste",
  "senha": "senha123",
  "nome": "Teste",
  "email": "teste@example.com",
  "cpf": "123",
  "rg": "123456789",
  "endereco": "Rua Teste, 123"
}
```
**Erro esperado:** `400 Bad Request` - "CPF deve ter 11 caracteres"

### Login com credenciais inválidas

**Usuário inexistente:**
```json
{
  "login": "usuario.inexistente",
  "senha": "senha123"
}
```
**Erro esperado:** `401 Unauthorized`

**Senha incorreta:**
```json
{
  "login": "joao.silva",
  "senha": "senhaerrada"
}
```
**Erro esperado:** `401 Unauthorized`

---

## Fluxo Completo de Teste

1. **Cadastrar novo aluno** → Guardar o ID retornado
2. **Fazer login com as credenciais** → Guardar o token JWT
3. **Consultar dados do aluno** usando o token
4. **Consultar saldo** usando o token
5. **Tentar acessar dados de outro aluno** → Deve retornar `403 Forbidden`

---

## Notas

- Todos os endpoints protegidos exigem o header `Authorization: Bearer {token}`
- O token é obtido após o login bem-sucedido
- O aluno só pode acessar seus próprios dados (validação por ID)
- CPF deve ter exatamente 11 dígitos (sem pontos ou traços)
- Login deve ter entre 3 e 100 caracteres
- Senha deve ter no mínimo 6 caracteres
