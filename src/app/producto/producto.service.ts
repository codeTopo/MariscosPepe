import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Respuestas } from '../Respuestas';
import { Producto } from './ProductosModule';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private apiservice:ApiService, private http: HttpClient) { }

  obtenerProductos(): Observable<Respuestas<Producto>> {
    const endpoint = 'api/productos';
    return this.apiservice.get<Producto>(endpoint);
  };

  crearProducto(producto: Producto): Observable<Respuestas<Producto>> {
    const endpoint = 'api/productos/agregar';
    return this.apiservice.post<Producto>(endpoint, producto);
  };

}

