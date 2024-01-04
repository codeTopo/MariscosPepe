import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../ProductosModule';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})

export class DialogComponent {

  mostrarProgressBar = false;
  checkbox1existencia = false;
  checkbox2agotado = false;

  constructor
  (
    public dialogRef:MatDialogRef<DialogComponent>,
    private productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Producto }
  ){
  };


  cerrar(){
    this.dialogRef.close();
  };

  guardarCambios() {
    this.mostrarProgressBar = true;
    this.data.producto.existencia = this.checkbox1existencia ? 1 : 0;
    const idProducto = this.data.producto.idProducto;
    this.productoService.editarProducto(idProducto, this.data.producto)
      .subscribe(
        respuesta => {
          this.mostrarProgressBar = false;
          console.log('Producto editado exitosamente:', respuesta);
          this.cerrar(); // Cerrar el diálogo después de editar exitosamente
        },
        error => {
          this.mostrarProgressBar = false;
          console.error('Error al editar el producto:', error);
          // Puedes manejar el error de alguna manera (mostrar un mensaje, etc.)
        }
      );
  }

}
