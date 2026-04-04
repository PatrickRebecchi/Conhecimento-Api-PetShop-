export enum Especie {
  CACHORRO = 'CACHORRO',
  GATO = 'GATO',
  PASSARO = 'PASSARO'
}

export enum Sexo {
  MACHO = 'MACHO',
  FEMEA = 'FEMEA'
}

export interface Pet {
  id?: number;
  nome: string;
  raca: string;
  idade: number;
  especie: Especie;
  peso: number;
  sexo: Sexo;
  clienteId: number;
  nomeCliente?: string;
}

export interface PetRequest {
  nome: string;
  raca: string;
  idade: number;
  especie: Especie;
  peso: number;
  sexo: Sexo;
  clienteId: number;
}