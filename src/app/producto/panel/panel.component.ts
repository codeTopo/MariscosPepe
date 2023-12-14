import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { Producto } from '../ProductosModule';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  productos: Producto[] = [];
  showAccionesComponent: boolean = false;

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.GetPedidos();

  };


  GetPedidos(){
    this.productoService.obtenerProductos().subscribe(
      data => {
        this.productos = data.data; // Accede a la propiedad 'data' en la respuesta del servidor
        console.log(this.productos);
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
  }
}
