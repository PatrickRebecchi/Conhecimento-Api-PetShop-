import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClienteService, PetService, ServicoService } from '../../services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="hero">
        <h1>Bem-vindo ao Pet Shop 🐾</h1>
        <p>Gerencie seus clientes, pets e serviços de forma simples e eficiente</p>
      </div>
      
      <div class="cards-grid">
        <div class="dashboard-card clientes">
          <div class="icon">👥</div>
          <h3>Clientes</h3>
          <p class="count">{{ totalClientes }}</p>
          <p class="label">cadastrados</p>
          <a routerLink="/clientes" class="card-link">Ver clientes →</a>
        </div>
        
        <div class="dashboard-card pets">
          <div class="icon">🐕</div>
          <h3>Pets</h3>
          <p class="count">{{ totalPets }}</p>
          <p class="label">cadastrados</p>
          <a routerLink="/pets" class="card-link">Ver pets →</a>
        </div>
        
        <div class="dashboard-card servicos">
          <div class="icon">✂️</div>
          <h3>Serviços</h3>
          <p class="count">{{ totalServicos }}</p>
          <p class="label">realizados</p>
          <a routerLink="/servicos" class="card-link">Ver serviços →</a>
        </div>
      </div>
      
      <div class="quick-actions">
        <h2>Ações Rápidas</h2>
        <div class="actions-grid">
          <a routerLink="/clientes/novo" class="action-btn">
            <span class="action-icon">➕</span>
            <span>Novo Cliente</span>
          </a>
          <a routerLink="/pets/novo" class="action-btn">
            <span class="action-icon">🐾</span>
            <span>Novo Pet</span>
          </a>
          <a routerLink="/servicos/novo" class="action-btn">
            <span class="action-icon">📋</span>
            <span>Novo Serviço</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      animation: fadeIn 0.5s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .hero {
      text-align: center;
      padding: 40px 20px;
      color: white;
    }
    
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .hero p {
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    
    .dashboard-card {
      background: white;
      border-radius: 20px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .dashboard-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
    }
    
    .dashboard-card.clientes::before {
      background: linear-gradient(90deg, #667eea, #764ba2);
    }
    
    .dashboard-card.pets::before {
      background: linear-gradient(90deg, #48bb78, #38a169);
    }
    
    .dashboard-card.servicos::before {
      background: linear-gradient(90deg, #ed8936, #dd6b20);
    }
    
    .dashboard-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
    }
    
    .dashboard-card .icon {
      font-size: 3rem;
      margin-bottom: 10px;
    }
    
    .dashboard-card h3 {
      color: #4a5568;
      margin-bottom: 10px;
      font-size: 1.3rem;
    }
    
    .dashboard-card .count {
      font-size: 2.5rem;
      font-weight: 700;
      color: #667eea;
      margin: 0;
    }
    
    .dashboard-card .label {
      color: #a0aec0;
      margin-bottom: 15px;
    }
    
    .dashboard-card .card-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .dashboard-card .card-link:hover {
      color: #764ba2;
    }
    
    .quick-actions {
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }
    
    .quick-actions h2 {
      color: #4a5568;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .actions-grid {
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    
    .action-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px 25px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .action-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
    }
    
    .action-icon {
      font-size: 1.2rem;
    }
  `]
})
export class HomeComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private petService = inject(PetService);
  private servicoService = inject(ServicoService);
  
  totalClientes = 0;
  totalPets = 0;
  totalServicos = 0;
  
  ngOnInit(): void {
    this.loadCounts();
  }
  
  loadCounts(): void {
    this.clienteService.getAllList().subscribe({
      next: (data) => {
        console.log('Clientes carregados:', data);
        this.totalClientes = data.length;
      },
      error: (err) => console.error('Erro clientes:', err)
    });
    
    this.petService.getAll().subscribe({
      next: (data) => {
        console.log('Pets carregados:', data);
        this.totalPets = data.length;
      },
      error: (err) => console.error('Erro pets:', err)
    });
    
    this.servicoService.getAll().subscribe({
      next: (data) => {
        console.log('Serviços carregados:', data);
        this.totalServicos = data.length;
      },
      error: (err) => console.error('Erro serviços:', err)
    });
  }
}