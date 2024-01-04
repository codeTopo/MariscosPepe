import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Respuestas } from '../Respuestas';
import { DatosVenta } from './VentaModel';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private apiservice:ApiService) { }


  GetVentas():Observable<Respuestas<DatosVenta>>{
    return this.apiservice.get<DatosVenta>('api/ventas')
  };

  EditarVenta(id: number, data: { status: string, repartidor: string }): Observable<Respuestas<DatosVenta>> {
    return this.apiservice.put<DatosVenta>(`api/ventas/${id}`, data);
  }
}
