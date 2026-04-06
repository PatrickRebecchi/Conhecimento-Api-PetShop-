import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicoCatalogoService } from '../../services';

@Component({
  selector: 'app-servico-catalogo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>{{ isEdit ? 'Editar' : 'Cadastrar' }} Serviço</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="nome">Nome do Serviço:</label>
          <input type="text" id="nome" [(ngModel)]="catalogo.nome" name="nome" required placeholder="Ex: Banho">
        </div>
        <div class="form-group">
          <label for="preco">Preço (R$):</label>
          <input type="number" id="preco" [(ngModel)]="catalogo.preco" name="preco" step="0.01" required placeholder="0,00">
        </div>
        <div class="actions">
          <button type="submit" class="btn btn-primary">{{ isEdit ? 'Atualizar' : 'Cadastrar' }}</button>
          <button type="button" (click)="cancel()" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .card { max-width: 500px; margin: 20px auto; padding: 30px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h2 { margin-bottom: 20px; color: #333; }
    .form-group { margin-bottom: 15px; }
    .form-group label { display: block; margin-bottom: 5px; color: #555; font-weight: 500; }
    .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
    .form-group input:focus { outline: none; border-color: #667eea; }
    .actions { display: flex; gap: 10px; margin-top: 20px; }
    .btn { padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    .btn-primary { background: #667eea; color: white; }
    .btn-secondary { background: #e2e8f0; color: #333; }
  `]
})
export class ServicoCatalogoFormComponent implements OnInit {
  private catalogoService = inject(ServicoCatalogoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  catalogo: any = { nome: '', preco: 0 };
  isEdit = false;
  catalogoId?: number;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.catalogoId = +id;
      this.isEdit = true;
      this.loadCatalogo();
    }
  }

  loadCatalogo(): void {
    if (this.catalogoId) {
      this.catalogoService.getById(this.catalogoId).subscribe({
        next: (data) => {
          this.catalogo = { nome: data.nome, preco: data.preco };
        },
        error: (err) => console.error('Erro ao carregar serviço', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.catalogoId) {
      this.catalogoService.update(this.catalogoId, this.catalogo).subscribe({
        next: () => {
          alert('Serviço atualizado com sucesso');
          this.router.navigate(['/servicos-catalogo']);
        },
        error: (err) => alert('Erro ao atualizar serviço')
      });
    } else {
      this.catalogoService.create(this.catalogo).subscribe({
        next: () => {
          alert('Serviço cadastrado com sucesso');
          this.router.navigate(['/servicos-catalogo']);
        },
        error: (err) => alert('Erro ao cadastrar serviço')
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/servicos-catalogo']);
  }
}