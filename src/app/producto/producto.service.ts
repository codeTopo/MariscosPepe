import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Respuestas } from '../Respuestas';
import { Producto } from './ProductosModule';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private apiservice:ApiService) { }

  obtenerProductos(): Observable<Respuestas<Producto>> {
    const endpoint = 'api/productos';
    return this.apiservice.get<Producto>(endpoint);
  };

  crearProducto(producto: Producto): Observable<Respuestas<Producto>> {
    const endpoint = 'api/productos/agregar';
    return this.apiservice.post<Producto>(endpoint, producto);
  };

  editarProducto(id:number, producto:Producto):Observable<Respuestas<Producto>>{
    const endpoint =`api/productos/${id}`
    return this.apiservice.put<Producto>(endpoint, producto)
  };

  eliminarProducto(id: number): Observable<Respuestas<Producto>> {
    const endpoint = `api/productos/${id}`; // Agregar el ID a la URL
    return this.apiservice.delete<Producto>(endpoint, null); // No se necesita body para DELETE
  };
}

