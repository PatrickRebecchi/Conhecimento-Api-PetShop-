import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PetService, ClienteService } from '../../services';
import { PetRequest, Cliente, Especie, Sexo } from '../../models';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Cadastrar Pet</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" [(ngModel)]="pet.nome" name="nome" required placeholder="Nome do pet">
        </div>
        <div class="form-group">
          <label for="raca">Raça:</label>
          <input type="text" id="raca" [(ngModel)]="pet.raca" name="raca" placeholder="Raça do pet">
        </div>
        <div class="form-group">
          <label for="idade">Idade:</label>
          <input type="number" id="idade" [(ngModel)]="pet.idade" name="idade" required placeholder="Idade em anos">
        </div>
        <div class="form-group">
          <label for="especie">Espécie:</label>
          <select id="especie" [(ngModel)]="pet.especie" name="especie" required>
            <option value="">Selecione</option>
            <option value="CACHORRO">Cachorro</option>
            <option value="GATO">Gato</option>
            <option value="PASSARO">Pássaro</option>
          </select>
        </div>
        <div class="form-group">
          <label for="peso">Peso (kg):</label>
          <input type="number" id="peso" [(ngModel)]="pet.peso" name="peso" step="0.01" required placeholder="Peso em kg">
        </div>
        <div class="form-group">
          <label for="sexo">Sexo:</label>
          <select id="sexo" [(ngModel)]="pet.sexo" name="sexo" required>
            <option value="">Selecione</option>
            <option value="MACHO">Macho</option>
            <option value="FEMEA">Fêmea</option>
          </select>
        </div>
        <div class="form-group">
          <label for="clienteId">Dono:</label>
          <select id="clienteId" [(ngModel)]="pet.clienteId" name="clienteId" required>
            <option value="">Selecione o dono</option>
            <option *ngFor="let cliente of clientes" [value]="cliente.id">{{ cliente.nome }}</option>
          </select>
        </div>
        <div class="actions">
          <button type="submit" class="btn btn-primary">Cadastrar</button>
          <button type="button" (click)="cancel()" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  `
})
export class PetFormComponent implements OnInit {
  private petService = inject(PetService);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  pet: PetRequest = {
    nome: '',
    raca: '',
    idade: 0,
    especie: Especie.CACHORRO,
    peso: 0,
    sexo: Sexo.MACHO,
    clienteId: 0
  };
  clientes: Cliente[] = [];

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getAll().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Erro ao carregar clientes', err)
    });
  }

  onSubmit(): void {
    this.petService.create(this.pet).subscribe({
      next: () => {
        alert('Pet cadastrado com sucesso');
        this.router.navigate(['/pets']);
      },
      error: (err) => {
        const msg = err.error?.message || 'Erro ao cadastrar pet';
        alert(msg);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/pets']);
  }
}