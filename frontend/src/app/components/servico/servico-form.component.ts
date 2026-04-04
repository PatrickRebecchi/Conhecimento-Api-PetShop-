import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicoService, PetService } from '../../services';
import { ServicoRequest, Pet, ServicoOferecido } from '../../models';

@Component({
  selector: 'app-servico-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>Cadastrar Serviço</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="servico">Serviço:</label>
          <select id="servico" [(ngModel)]="servico.servico" name="servico" required>
            <option value="">Selecione</option>
            <option value="BANHO">Banho</option>
            <option value="TOSA">Tosa</option>
            <option value="CORTE_UNHA">Corte de unha</option>
            <option value="VACINACAO">Vacinação</option>
            <option value="CONSULTA">Consulta</option>
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
  private petService = inject(PetService);
  private router = inject(Router);

  servico: ServicoRequest = {
    servico: ServicoOferecido.BANHO,
    preco: 0,
    observacao: '',
    petId: 0
  };
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