import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicoCatalogo, ServicoCatalogoRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServicoCatalogoService {
  private http = inject(HttpClient);
  // <environment_details>
  // Original: http://localhost:8080/servico-catalogo
  // </environment_details>
  private apiUrl = 'https://api-petshop-fb5j.onrender.com/servico-catalogo';

  getAll(): Observable<ServicoCatalogo[]> {
    return this.http.get<ServicoCatalogo[]>(this.apiUrl);
  }

  getAtivos(): Observable<ServicoCatalogo[]> {
    return this.http.get<ServicoCatalogo[]>(`${this.apiUrl}/ativos`);
  }

  getById(id: number): Observable<ServicoCatalogo> {
    return this.http.get<ServicoCatalogo>(`${this.apiUrl}/${id}`);
  }

  create(catalogo: ServicoCatalogoRequest): Observable<ServicoCatalogo> {
    return this.http.post<ServicoCatalogo>(this.apiUrl, catalogo);
  }

  update(id: number, catalogo: ServicoCatalogoRequest): Observable<ServicoCatalogo> {
    return this.http.put<ServicoCatalogo>(`${this.apiUrl}/${id}`, catalogo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}