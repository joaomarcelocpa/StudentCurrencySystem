CREATE TABLE alunos (
    cpf character varying(11) NOT NULL,
    email character varying(200) NOT NULL,
    endereco character varying(500) NOT NULL,
    nome character varying(200) NOT NULL,
    rg character varying(20) NOT NULL,
    saldo_moedas integer(32,0) NOT NULL,
    usuario_id bigint(64,0) NOT NULL,
    PRIMARY KEY (usuario_id),
    UNIQUE (cpf),
    UNIQUE (email),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE empresas (
    id bigint(64,0) NOT NULL,
    ativa boolean NOT NULL,
    cnpj character varying(14) NOT NULL,
    email character varying(500),
    endereco character varying(500) NOT NULL,
    nome character varying(200) NOT NULL,
    usuario_id bigint(64,0) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (cnpj),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE professores (
    cpf character varying(11) NOT NULL,
    departamento character varying(200) NOT NULL,
    nome character varying(200) NOT NULL,
    saldo_moedas integer(32,0) NOT NULL,
    usuario_id bigint(64,0) NOT NULL,
    PRIMARY KEY (usuario_id),
    UNIQUE (cpf),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
CREATE TABLE resgates_vantagens (
    id bigint(64,0) NOT NULL,
    codigo_resgate character varying(100) NOT NULL,
    data_resgate timestamp without time zone NOT NULL,
    utilizado boolean NOT NULL,
    valor_moedas integer(32,0) NOT NULL,
    aluno_id bigint(64,0) NOT NULL,
    vantagem_id bigint(64,0) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (codigo_resgate),
    FOREIGN KEY (aluno_id) REFERENCES alunos(usuario_id),
    FOREIGN KEY (vantagem_id) REFERENCES vantagens(id)
);
CREATE TABLE transacoes (
    id bigint(64,0) NOT NULL,
    data_hora timestamp without time zone NOT NULL,
    motivo character varying(500) NOT NULL,
    valor integer(32,0) NOT NULL,
    aluno_id bigint(64,0) NOT NULL,
    professor_id bigint(64,0) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (aluno_id) REFERENCES alunos(usuario_id),
    FOREIGN KEY (professor_id) REFERENCES professores(usuario_id)
);
CREATE TABLE usuarios (
    id bigint(64,0) NOT NULL,
    ativo boolean NOT NULL,
    login character varying(100) NOT NULL,
    senha character varying(255) NOT NULL,
    tipo character varying(20) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (login),
    CHECK (((tipo)::text = ANY (ARRAY['ALUNO'::text, 'PROFESSOR'::text, 'EMPRESA'::text])))
);
CREATE TABLE vantagens (
    id bigint(64,0) NOT NULL,
    ativa boolean NOT NULL,
    custo_moedas integer(32,0) NOT NULL,
    descricao character varying(1000) NOT NULL,
    nome character varying(200) NOT NULL,
    url_foto character varying(500),
    empresa_id bigint(64,0) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);