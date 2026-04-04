import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicoService } from '../../services';
import { Servico } from '../../models';

@Component({
  selector: 'app-servico-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card">
      <h2>Lista de Serviços</h2>
      <div class="actions">
        <a routerLink="/servicos/novo" class="btn btn-primary">+ Novo Serviço</a>
        <button (click)="loadServicos()" class="btn btn-secondary">Atualizar</button>
      </div>
      <table *ngIf="servicos.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Serviço</th>
            <th>Preço</th>
            <th>Data</th>
            <th>Status</th>
            <th>Pet</th>
            <th>Espécie</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let servico of servicos">
            <td>{{ servico.id }}</td>
            <td>{{ servico.nomeServico }}</td>
            <td>{{ servico.preco | currency:'BRL' }}</td>
            <td>{{ servico.createAt | date:'dd/MM/yyyy HH:mm' }}</td>
            <td>
              <span class="status-badge" [class]="servico.status.toLowerCase()">{{ servico.status }}</span>
            </td>
            <td>{{ servico.nomePet }}</td>
            <td>{{ servico.especie }}</td>
          </tr>
        </tbody>
      </table>
      <p *ngIf="servicos.length === 0" class="empty-state">Nenhum serviço encontrado</p>
    </div>
  `
})
export class ServicoListComponent implements OnInit {
  private servicoService = inject(ServicoService);
  servicos: Servico[] = [];

  ngOnInit(): void {
    this.loadServicos();
  }

  loadServicos(): void {
    this.servicoService.getAll().subscribe({
      next: (data) => this.servicos = data,
      error: (err) => console.error('Erro ao carregar serviços', err)
    });
  }
}