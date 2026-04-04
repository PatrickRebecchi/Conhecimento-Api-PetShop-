export enum ServicoOferecido {
  BANHO = 'BANHO',
  TOSA = 'TOSA',
  CORTE_UNHA = 'CORTE_UNHA',
  VACINACAO = 'VACINACAO',
  CONSULTA = 'CONSULTA'
}

export enum StatusAgendamento {
  AGENDADO = 'AGENDADO',
  CANCELADO = 'CANCELADO',
  FINALIZADO = 'FINALIZADO'
}

export interface Servico {
  id?: number;
  nomeServico: ServicoOferecido;
  preco: number;
  createAt?: string;
  status: StatusAgendamento;
  observacoes: string;
  petId: number;
  nomePet: string;
  especie: string;
}

export interface ServicoRequest {
  servico: ServicoOferecido;
  preco: number;
  observacao: string;
  petId: number;
}