import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService } from '../../services';
import { Cliente, ClientePage } from '../../models';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="card">
      <h2>Lista de Clientes</h2>
      <div class="actions">
        <a routerLink="/clientes/novo" class="btn btn-primary">+ Novo Cliente</a>
        <button (click)="loadClientes()" class="btn btn-secondary">Atualizar</button>
      </div>
      <div class="pagination-info">
        Mostrando {{ clientes.length }} de {{ pageData.totalElements }} clientes
        (Página {{ pageData.number + 1 }} de {{ pageData.totalPages }})
      </div>
      <table *ngIf="clientes.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Pets</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cliente of clientes">
            <td>{{ cliente.id }}</td>
            <td>{{ cliente.nome }}</td>
            <td>{{ cliente.telefone }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.quantidadePets }}</td>
            <td class="actions">
              <a [routerLink]="['/clientes/editar', cliente.id]" class="btn btn-primary">Editar</a>
              <button (click)="deleteCliente(cliente.id!)" class="btn btn-danger">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p *ngIf="clientes.length === 0" class="empty-state">Nenhum cliente encontrado</p>
      
      <div class="pagination" *ngIf="pageData.totalPages > 1">
        <button (click)="previousPage()" [disabled]="pageData.first" class="btn btn-secondary">
          Anterior
        </button>
        <span class="page-info">Página {{ pageData.number + 1 }} de {{ pageData.totalPages }}</span>
        <button (click)="nextPage()" [disabled]="pageData.last" class="btn btn-secondary">
          Próxima
        </button>
      </div>
    </div>
  `
})
export class ClienteListComponent implements OnInit {
  private clienteService = inject(ClienteService);
  clientes: Cliente[] = [];
  currentPage = 0;
  pageSize = 30;
  pageData: ClientePage = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 30,
    number: 0,
    first: true,
    last: true,
    empty: true
  };

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    console.log('Carregando clientes página:', this.currentPage);
    this.clienteService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.clientes = data.content;
        this.pageData = data;
      },
      error: (err) => console.error('Erro ao carregar clientes', err)
    });
  }

  previousPage(): void {
    if (!this.pageData.first) {
      this.currentPage--;
      this.loadClientes();
    }
  }

  nextPage(): void {
    if (!this.pageData.last) {
      this.currentPage++;
      this.loadClientes();
    }
  }

  deleteCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.delete(id).subscribe({
        next: () => {
          alert('Cliente excluído com sucesso');
          this.loadClientes();
        },
        error: (err) => console.error('Erro ao excluir cliente', err)
      });
    }
  }
}