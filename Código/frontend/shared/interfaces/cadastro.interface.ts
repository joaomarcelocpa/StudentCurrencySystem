// Interfaces para requisições
export interface AlunoRequest {
    login: string;
    senha: string;
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    endereco: string;
}

export interface EmpresaRequest {
    login: string;
    senha: string;
    nome: string;
    cnpj: string;
    endereco: string;
    email: string;
}

// Interfaces para respostas
export interface AlunoResponse {
    id: number;
    login: string;
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    endereco: string;
    saldoMoedas: number;
    dataCadastro: string;
}

export interface EmpresaResponse {
    id: number;
    login: string;
    nome: string;
    cnpj: string;
    endereco: string;
    email: string;
    dataCadastro: string;
}

// Interface para erros de validação
export interface ValidationError {
    field: string;
    message: string;
}

export interface ApiError {
    message: string;
    errors?: ValidationError[];
    status: number;
}