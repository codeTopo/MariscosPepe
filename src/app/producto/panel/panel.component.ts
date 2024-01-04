import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { Producto } from '../ProductosModule';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Message } from 'primeng/api';
import { DeleteComponent } from 'src/app/delete/delete.component';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  productos: Producto[] = [];
  showAccionesComponent: boolean = false;
  messages: Message[] | undefined;
  filtro: string = '';
  productoSeleccionado: Producto | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    public dialog: MatDialog,
    )
  { }

  ngOnInit(): void {
    this.GetProductos();
  };

  GetProductos(){
    this.productoService.obtenerProductos().subscribe(
      data => {
        this.productos = data.data.filter(prod =>
          prod.nombre.toLowerCase().includes(this.filtro.toLowerCase())
        );
      },
      error => {
        // Manejar el error aquí
        console.error(error);
      }
    );
  };

  navigateToAcciones() {
    this.router.navigateByUrl('/producto/lista/(accionesOutlet:acciones)');
    this.showAccionesComponent = true;
  }

  toggleAccionesComponent() {
    this.showAccionesComponent = !this.showAccionesComponent;
  };

  editProducto(producto: Producto): void {
    this.productoSeleccionado = producto;  // Guarda el producto seleccionado
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { producto: this.productoSeleccionado }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El cuadro de diálogo fue cerrado');
    });
  }

  Delete(producto:Producto){
    const dialogRef =this.dialog.open(DeleteComponent, {
      width : '12000',

    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.productoService.eliminarProducto(producto.idProducto).subscribe(
          (response) => {
            console.log('Producto eliminado:', response);
            this.GetProductos();
          },
          (error) => {
            // Manejar el error aquí
            console.error('Error al eliminar el producto:', error);
          });
      }
    })
  };
}
