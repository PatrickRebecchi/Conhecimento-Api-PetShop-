import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PetService } from '../../services';
import { Pet } from '../../models';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card">
      <h2>Lista de Pets</h2>
      <div class="actions">
        <a routerLink="/pets/novo" class="btn btn-primary">+ Novo Pet</a>
        <button (click)="loadPets()" class="btn btn-secondary">Atualizar</button>
      </div>
      <table *ngIf="pets.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Raça</th>
            <th>Idade</th>
            <th>Espécie</th>
            <th>Peso</th>
            <th>Sexo</th>
            <th>Dono</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let pet of pets">
            <td>{{ pet.id }}</td>
            <td>{{ pet.nome }}</td>
            <td>{{ pet.raca }}</td>
            <td>{{ pet.idade }}</td>
            <td>{{ pet.especie }}</td>
            <td>{{ pet.peso }} kg</td>
            <td>{{ pet.sexo }}</td>
            <td>{{ pet.nomeCliente }}</td>
          </tr>
        </tbody>
      </table>
      <p *ngIf="pets.length === 0" class="empty-state">Nenhum pet encontrado</p>
    </div>
  `
})
export class PetListComponent implements OnInit {
  private petService = inject(PetService);
  pets: Pet[] = [];

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getAll().subscribe({
      next: (data) => this.pets = data,
      error: (err) => console.error('Erro ao carregar pets', err)
    });
  }
}