import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Cliente } from './Models';
import { Respuestas } from '../Respuestas';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private apiservice:ApiService, private http: HttpClient) { }

  getCliente(): Observable<Respuestas<Cliente>>{
    const endpoint = 'api/clientes';
    return this.apiservice.get<Cliente>(endpoint);
  };

  addCliente(cliente:Cliente):Observable<Respuestas<Cliente>>{
    const endpoint = 'api/clientes/agregar';
    return this.apiservice.post<Cliente>(endpoint, cliente)
  };

  putCliente(id:number, cliente:Cliente):Observable<Respuestas<Cliente>>{
    const endpoint =`api/clientes/${id}`;
    return this.apiservice.put<Cliente>(endpoint, cliente)
  };

  deleteCliente(id:number, ):Observable<Respuestas<Cliente>>{
    const endpoint =`api/clientes/${id}`;
    return this.apiservice.delete<Cliente>(endpoint, '')
  };

}
