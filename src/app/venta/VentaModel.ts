export interface Cliente {
    idCliente: number;
    nombre: string;
    apellido: string;
    calle: string;
    colonia: string;
    numero: string;
    telefono: string;
    referencia: string;
  }

export  interface Producto {
    idProducto: number;
    productoV: {
      nombre: string;
    }[];
    cantidad: number;
    precio: number;
  }

export  interface DatosVenta {
    idVenta: number;
    fecha: string;
    pago: string;
    status:string;
    repartidor:string;
    cliente: number;
    clientesV: Cliente[];
    pedido: Producto[];
    total: number;
  }
