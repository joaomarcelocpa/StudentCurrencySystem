-- Script de exemplo para popular o banco de dados
-- Execute este script após a criação das tabelas pelo Hibernate

-- Inserir Empresas
INSERT INTO empresas (nome, cnpj, endereco, email, ativa) VALUES
('Tech Store', '12345678000190', 'Av. Tecnologia, 100', 'contato@techstore.com', true),
('Livraria Central', '98765432000180', 'Rua dos Livros, 50', 'contato@livrariacentral.com', true),
('Academia Fitness', '11122233000170', 'Av. Saúde, 200', 'contato@academiafitness.com', true);

-- Inserir Vantagens
INSERT INTO vantagens (nome, descricao, custo_moedas, url_foto, empresa_id, ativa) VALUES
('Desconto 20% em Notebook', 'Ganhe 20% de desconto na compra de qualquer notebook', 100, 'https://example.com/notebook.jpg', 1, true),
('Mouse Gamer Grátis', 'Ganhe um mouse gamer na compra acima de R$ 500', 80, 'https://example.com/mouse.jpg', 1, true),
('Livro Técnico', 'Escolha um livro técnico de programação', 50, 'https://example.com/livro.jpg', 2, true),
('Kit Material Escolar', 'Kit completo com cadernos, canetas e material de apoio', 40, 'https://example.com/material.jpg', 2, true),
('1 Mês de Academia', 'Acesso gratuito por 1 mês à academia', 120, 'https://example.com/academia.jpg', 3, true),
('Aula Personal Trainer', '3 aulas com personal trainer', 90, 'https://example.com/personal.jpg', 3, true);

-- Observações:
-- 1. Não inserimos usuários (professores/alunos) pois as senhas precisam ser criptografadas
-- 2. Use os endpoints de cadastro da API para criar usuários
-- 3. As senhas serão criptografadas automaticamente pelo BCrypt

-- Exemplo de chamadas para criar usuários (use via API):
/*
-- Professor:
POST /api/professores/cadastro
{
  "login": "prof.silva",
  "senha": "senha123",
  "nome": "Maria Silva",
  "cpf": "12345678901",
  "departamento": "Ciência da Computação"
}

-- Aluno:
POST /api/alunos/cadastro
{
  "login": "aluno.joao",
  "senha": "senha123",
  "nome": "João Santos",
  "email": "joao.santos@email.com",
  "cpf": "98765432100",
  "rg": "123456789",
  "endereco": "Rua Exemplo, 123 - Bairro - Cidade/UF"
}
*/
