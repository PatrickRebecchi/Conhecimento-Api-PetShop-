import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicoService, ServicoCatalogoService, PetService } from '../../services';
import { ServicoRequest, Pet, ServicoCatalogo } from '../../models';

@Component({
  selector: 'app-servico-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Registrar Serviço</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="servicoCatalogoId">Serviço:</label>
          <select id="servicoCatalogoId" [(ngModel)]="servico.servicoCatalogoId" name="servicoCatalogoId" (change)="onServicoChange()" required>
            <option value="">Selecione um serviço</option>
            <option *ngFor="let cat of catalogos" [value]="cat.id">{{ cat.nome }} - R$ {{ cat.preco | number:'1.2-2' }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="preco">Preço (R$):</label>
          <input type="number" id="preco" [(ngModel)]="servico.preco" name="preco" step="0.01" required placeholder="0,00">
        </div>
        <div class="form-group">
          <label for="observacao">Observação:</label>
          <textarea id="observacao" [(ngModel)]="servico.observacao" name="observacao" rows="3" placeholder="Observações sobre o serviço..."></textarea>
        </div>
        <div class="form-group">
          <label for="petId">Pet:</label>
          <select id="petId" [(ngModel)]="servico.petId" name="petId" required>
            <option value="">Selecione o pet</option>
            <option *ngFor="let pet of pets" [value]="pet.id">{{ pet.nome }} ({{ pet.nomeCliente }})</option>
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
export class ServicoFormComponent implements OnInit {
  private servicoService = inject(ServicoService);
  private catalogoService = inject(ServicoCatalogoService);
  private petService = inject(PetService);
  private router = inject(Router);

  servico: ServicoRequest = {
    servicoCatalogoId: 0,
    preco: 0,
    observacao: '',
    petId: 0
  };
  pets: Pet[] = [];
  catalogos: ServicoCatalogo[] = [];

  ngOnInit(): void {
    this.loadCatalogos();
    this.loadPets();
  }

  loadCatalogos(): void {
    this.catalogoService.getAtivos().subscribe({
      next: (data) => this.catalogos = data,
      error: (err) => console.error('Erro ao carregar catálogo', err)
    });
  }

  loadPets(): void {
    this.petService.getAll().subscribe({
      next: (data) => this.pets = data,
      error: (err) => console.error('Erro ao carregar pets', err)
    });
  }

  onServicoChange(): void {
    const catalogo = this.catalogos.find(c => c.id === this.servico.servicoCatalogoId);
    if (catalogo) {
      this.servico.preco = catalogo.preco;
    }
  }

  onSubmit(): void {
    this.servicoService.create(this.servico).subscribe({
      next: () => {
        alert('Serviço cadastrado com sucesso');
        this.router.navigate(['/servicos']);
      },
      error: (err) => {
        const msg = err.error?.message || 'Erro ao cadastrar serviço';
        alert(msg);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/servicos']);
  }
}