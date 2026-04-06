import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet, PetRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private http = inject(HttpClient);
  // <environment_details>
  // Original: http://localhost:8080/pet
  // </environment_details>
  private apiUrl = 'https://api-petshop-fb5j.onrender.com/pet';

  getAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  getById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  create(pet: PetRequest): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }
}