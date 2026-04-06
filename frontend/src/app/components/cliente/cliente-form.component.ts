import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services';
import { ClienteRequest } from '../../models';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <h2>{{ isEdit ? 'Editar' : 'Cadastrar' }} Cliente</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" [(ngModel)]="cliente.nome" name="nome" required placeholder="Digite o nome">
        </div>
        <div class="form-group">
          <label for="telefone">Telefone:</label>
          <input type="text" id="telefone" [(ngModel)]="cliente.telefone" name="telefone" placeholder="(xx) xxxxx-xxxx">
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" [(ngModel)]="cliente.email" name="email" required placeholder="email@exemplo.com">
        </div>
        <div class="actions">
          <button type="submit" class="btn btn-primary">{{ isEdit ? 'Atualizar' : 'Cadastrar' }}</button>
          <button type="button" (click)="cancel()" class="btn btn-secondary">Cancelar</button>
        </div>
      </form>
    </div>
  `
})
export class ClienteFormComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  cliente: ClienteRequest = { nome: '', telefone: '', email: '' };
  clienteOriginal: ClienteRequest = { nome: '', telefone: '', email: '' };
  isEdit = false;
  clienteId?: number;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteId = +id;
      this.isEdit = true;
      this.loadCliente();
    }
  }

  loadCliente(): void {
    if (this.clienteId) {
      this.clienteService.getById(this.clienteId).subscribe({
        next: (data) => {
          this.cliente = {
            nome: data.nome,
            telefone: data.telefone || '',
            email: data.email
          };
          this.clienteOriginal = { ...this.cliente };
        },
        error: (err) => console.error('Erro ao carregar cliente', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.clienteId) {
      const dadosAlterados: any = {};
      
      if (this.cliente.nome !== this.clienteOriginal.nome) {
        dadosAlterados.nome = this.cliente.nome;
      }
      if (this.cliente.telefone !== this.clienteOriginal.telefone) {
        dadosAlterados.telefone = this.cliente.telefone;
      }
      if (this.cliente.email !== this.clienteOriginal.email) {
        dadosAlterados.email = this.cliente.email;
      }
      
      if (Object.keys(dadosAlterados).length === 0) {
        alert('Nenhuma alteração detectada');
        return;
      }
      
      this.clienteService.update(this.clienteId, dadosAlterados).subscribe({
        next: () => {
          alert('Cliente atualizado com sucesso');
          this.clienteOriginal = { ...this.cliente };
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          const msg = err.error?.message || 'Erro ao atualizar cliente';
          alert(msg);
        }
      });
    } else {
      this.clienteService.create(this.cliente).subscribe({
        next: () => {
          alert('Cliente cadastrado com sucesso');
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          const msg = err.error?.message || 'Erro ao cadastrar cliente';
          alert(msg);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}