export interface Cliente {
  id?: number;
  nome: string;
  telefone: string;
  email: string;
  quantidadePets?: number;
}

export interface ClientePage {
  content: Cliente[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
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