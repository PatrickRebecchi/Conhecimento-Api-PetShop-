import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicoCatalogoService } from '../../services';

@Component({
  selector: 'app-servico-catalogo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="header">
        <h1>Catálogo de Serviços</h1>
        <a routerLink="/servicos-catalogo/novo" class="btn btn-primary">
          + Novo Serviço
        </a>
      </div>
      
      <div class="cards-grid">
        <div class="card" *ngFor="let catalogo of catalogos">
          <div class="card-header">
            <span class="badge" [class.ativo]="catalogo.ativo" [class.inativo]="!catalogo.ativo">
              {{ catalogo.ativo ? 'Ativo' : 'Inativo' }}
            </span>
          </div>
          <div class="card-body">
            <h3>{{ catalogo.nome }}</h3>
            <p class="preco">R$ {{ catalogo.preco | number:'1.2-2' }}</p>
          </div>
          <div class="card-actions">
            <button (click)="editar(catalogo.id)" class="btn btn-primary">Editar</button>
            <button (click)="toggleAtivo(catalogo)" class="btn" [class.btn-warning]="catalogo.ativo" [class.btn-success]="!catalogo.ativo">
              {{ catalogo.ativo ? 'Desativar' : 'Ativar' }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="empty-state" *ngIf="catalogos.length === 0">
        <p>Nenhum serviço cadastrado no catálogo.</p>
        <a routerLink="/servicos-catalogo/novo" class="btn btn-primary">Cadastrar primeiro serviço</a>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .header h1 { color: #333; }
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
    .card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .card-header { display: flex; justify-content: flex-end; margin-bottom: 10px; }
    .badge { padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
    .badge.ativo { background: #d4edda; color: #155724; }
    .badge.inativo { background: #f8d7da; color: #721c24; }
    .card-body h3 { margin: 0 0 10px; color: #333; }
    .preco { font-size: 1.5rem; font-weight: 700; color: #667eea; margin: 0; }
    .card-actions { display: flex; gap: 10px; margin-top: 15px; }
    .btn { padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .btn-primary { background: #667eea; color: white; }
    .btn-warning { background: #f59e0b; color: white; }
    .btn-success { background: #10b981; color: white; }
    .empty-state { text-align: center; padding: 40px; color: #666; }
  `]
})
export class ServicoCatalogoListComponent implements OnInit {
  private catalogoService = inject(ServicoCatalogoService);
  
  catalogos: any[] = [];
  
  ngOnInit(): void {
    this.loadCatalogos();
  }
  
  loadCatalogos(): void {
    this.catalogoService.getAll().subscribe({
      next: (data) => this.catalogos = data,
      error: (err) => console.error('Erro ao carregar catálogo', err)
    });
  }
  
  editar(id: number): void {
    window.location.href = `/servicos-catalogo/editar/${id}`;
  }
  
  toggleAtivo(catalogo: any): void {
    const acao = catalogo.ativo ? 'desativar' : 'ativar';
    if (confirm(`Deseja ${acao} o serviço "${catalogo.nome}"?`)) {
      this.catalogoService.delete(catalogo.id).subscribe({
        next: () => {
          alert(`Serviço ${acao}do com sucesso`);
          this.loadCatalogos();
        },
        error: (err) => alert('Erro ao atualizar serviço')
      });
    }
  }
}