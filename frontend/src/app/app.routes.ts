import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteListComponent } from './components/cliente/cliente-list.component';
import { ClienteFormComponent } from './components/cliente/cliente-form.component';
import { PetListComponent } from './components/pet/pet-list.component';
import { PetFormComponent } from './components/pet/pet-form.component';
import { ServicoListComponent } from './components/servico/servico-list.component';
import { ServicoFormComponent } from './components/servico/servico-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/novo', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },
  { path: 'pets', component: PetListComponent },
  { path: 'pets/novo', component: PetFormComponent },
  { path: 'servicos', component: ServicoListComponent },
  { path: 'servicos/novo', component: ServicoFormComponent },
  { path: '**', redirectTo: '' }
];