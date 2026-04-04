export interface Cliente {
  id?: number;
  nome: string;
  telefone: string;
  email: string;
  quantidadePets?: number;
}

export interface ClienteRequest {
  nome: string;
  telefone: string;
  email: string;
}

export interface ClienteUpdateRequest {
  nome?: string;
  telefone?: string;
  email?: string;
}