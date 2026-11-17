import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Coque } from './coque';

const URL = 'http://localhost:3000/coques';

@Injectable({ providedIn: 'root' })
export class CoqueService {
  http = inject(HttpClient);
  listeCoques = signal<Coque[]>([]);
  coques = this.listeCoques.asReadonly();

  getCoques(): Observable<Coque[]> {
    return this.http.get<Coque[]>(URL).pipe(
      tap(coques => this.listeCoques.set(coques))
    );
  }

  updateCoque(coque: Coque): Observable<Coque> {
    return this.http.put<Coque>(`${URL}/${coque.id}`, coque).pipe(
      tap(coqueModifiee => this.listeCoques.update(coques =>
        coques.map(c => c.id === coqueModifiee.id ? coqueModifiee : c)
      ))
    );
  }
}
