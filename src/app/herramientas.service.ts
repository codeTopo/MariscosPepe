import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Respuestas } from './Respuestas';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  private resetSuccessSubject = new Subject<void>();
  private generateOptions(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return { headers };
  }

  constructor( private url: ApiService, private http: HttpClient,) { }

  //Solicitud para Reiniciar Ventas Y concpetos
  resetTable<T>(tabla: string): Observable<Respuestas<T>> {
    return this.http.delete<Respuestas<T>>(`${this.url.apiUrl}/api/herramientas/reset/${tabla}`, this.generateOptions()).
    pipe(tap(() => this.resetSuccessSubject.next()));
  };
   //Solicitud Para mostrar Total de las Ventas
   totalVentas<T>(): Observable<Respuestas<T>> {
    return this.http.get<Respuestas<T>>(`${this.url.apiUrl}/api/herramientas/total`, this.generateOptions());
  };
  //Solicitud Para Modificar el Horario
  horario<T>(inicio: string, fin:string): Observable<Respuestas<T>> {
    const body = { inicioHora: inicio, finHora: fin };
    return this.http.post<Respuestas<T>>(`${this.url.apiUrl}/api/herramientas/horario`, body, this.generateOptions());
  };

  onResetSuccess(): Observable<void> {
    return this.resetSuccessSubject.asObservable();
  }

}
