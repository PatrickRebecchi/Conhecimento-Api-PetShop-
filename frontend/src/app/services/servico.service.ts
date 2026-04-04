import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico, ServicoRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/servico';

  getAll(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.apiUrl);
  }

  create(servico: ServicoRequest): Observable<Servico> {
    return this.http.post<Servico>(this.apiUrl, servico);
  }
}