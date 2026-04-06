export enum StatusAgendamento {
  AGENDADO = 'AGENDADO',
  CANCELADO = 'CANCELADO',
  FINALIZADO = 'FINALIZADO'
}

export interface ServicoCatalogo {
  id: number;
  nome: string;
  preco: number;
  ativo: boolean;
}

export interface ServicoCatalogoRequest {
  nome: string;
  preco: number;
}

export interface Servico {
  id?: number;
  nomeServico: string;
  preco: number;
  createAt?: string;
  status: StatusAgendamento;
  observacoes: string;
  petId: number;
  nomePet: string;
  especie: string;
}

export interface ServicoRequest {
  servicoCatalogoId: number;
  preco: number;
  observacao: string;
  petId: number;
}