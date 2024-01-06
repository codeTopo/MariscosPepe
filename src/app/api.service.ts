import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Respuestas } from './Respuestas';
import { DatosVenta } from './venta/VentaModel';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private mensajesSubject = new BehaviorSubject<string[]>([]);
  mensajes$ = this.mensajesSubject.asObservable();
  public apiUrl = 'https://mariscospepe.somee.com'; // Coloca la URL de tu API aquí

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  public get<T>(endpoint: string): Observable<Respuestas<T>> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = this.getHeaders();
    return this.http.get<Respuestas<T>>(url, { headers });
  }

  getId(id: number): Observable<DatosVenta> {
    const endpoint = 'api/ventas';
     const url = `${this.apiUrl}/${endpoint}/${id}`;
    const headers = this.getHeaders();
    return this.http.get<DatosVenta>(url, {headers});
  };


  public post<T>(endpoint: string, body: any): Observable<Respuestas<T>> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = this.getHeaders();
    return this.http.post<Respuestas<T>>(url, body, { headers });
  }

  public put<T>(endpoint: string, body: any): Observable<Respuestas<T>> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = this.getHeaders();
    return this.http.put<Respuestas<T>>(url, body, { headers });
  }

  public delete<T>(endpoint: string, body: any): Observable<Respuestas<T>> {
    const url = `${this.apiUrl}/${endpoint}`;
    const headers = this.getHeaders();
    return this.http.delete<Respuestas<T>>(url, { headers, body });
  };

}
