import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../ProductosModule';
import { ApiService } from 'src/app/api.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {

  nombre!:string;
  descripcion!:string;
  precio!:number;
  ubicacion!:string;
  existencia: number | null = null;
  existenteCheckbox: boolean = false;
  agotadoCheckbox: boolean = false;
  loading = false;

  constructor
  (
    private apiservice:ApiService,
    public dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public edProducto:Producto

  ){
    if(edProducto !== null){
      this.nombre =edProducto.nombre;
      this.descripcion = edProducto.descripcion;
      this.precio = edProducto.precio;
      this.ubicacion= edProducto.ubicacion;
    }
  };

  cerrar(){
    this.dialogRef.close();
  };


  editProducto(){

    this.existencia = this.existenteCheckbox ? 1 : (this.agotadoCheckbox ? 0 : null);
    const nProduc: Producto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      idProducto: this.edProducto.idProducto,
      ubicacion: this.ubicacion,
      existencia:this.existencia,
    };
    const endpoint = `api/productos/${this.edProducto.idProducto}`;
    this.loading = true;
    this.apiservice.put<any>(endpoint, nProduc)
    .pipe(
      finalize(() => {
        // Esta parte se ejecutará tanto si la solicitud tiene éxito como si hay un error
        this.loading = false; // Ocultar ProgressBar
      })
    )
    .subscribe(
      (respuesta) => {
        this.dialogRef.close();
        console.log('Respuesta del servidor:', respuesta);
      },
      (error) => {
        console.error('Error al hacer la solicitud POST:', error);
        console.log('Detalles del error:', error.error);
      }
    );
  };
}
