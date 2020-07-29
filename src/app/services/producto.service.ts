//El injectable es para utilizar este servicio cualquier componente
import { Injectable } from '@angular/core';
//El HttpClient, HttpHeaders sirve para hacer peticiones ajax al backend
import { HttpClient, HttpHeaders } from '@angular/common/http';
//El observable sirve para recibir los resultados que nos devuelva el api
import { Observable } from 'rxjs';
import { global } from './global';
import { TotalCarrito } from '../models/totalcarrito';
import { Carrito } from '../models/carrito';
import Swal from 'sweetalert2';

//El injectable es inyectar esta clase en cualquier componente
@Injectable()
export class ProductoService {
  public url: string;
  public productos: Carrito[];
  public totalcarrito: TotalCarrito[];

  constructor(
    private _http: HttpClient
  ) {
    this.url = global.url;
    this.productos = [
    ];
    this.totalcarrito = [
    ];
  }

  prueba() {
    return "Hola mundo desde el topic Service";
  }

  addProduct(token, product): Observable<any> {

    //product.precio = parseInt(product.precio);
    //product.stock = parseInt(product.stock);

    //Convierte el objeto del producto en un json string
    let params = JSON.stringify(product);
    //console.log(params);

    //Definimos las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);


    //Hacer petición ajax
    return this._http.post(this.url + 'guardarproducto', params, { headers: headers });
  }

  guardarCarrito(): Observable<any> {
    let carrito = JSON.parse(localStorage.getItem('productos'));

    let params = JSON.stringify(carrito);

    //Definimos las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    //Hacer petición ajax
    return this._http.post(this.url + 'carrito/compra', params, { headers: headers });
  }

  getCarrito() {
    let estado: boolean = false;
    let totalCarrito = 0;
    let totalPago = JSON.parse(localStorage.getItem('totalcarrito'));
    let carritoTotal = null;
    for (let i = 0; i < this.productos.length; i++) {
      let pagototal = parseInt(this.productos[i].totalpago);
      //console.log(typeof(pagototal));
      //let totalCarritoSumar = parseInt(totalCarrito);
      let precioFinalCarrito = pagototal + totalCarrito;
      let carritoActualizado = JSON.stringify(precioFinalCarrito);
      carritoTotal = carritoActualizado;
      localStorage.setItem('productos', JSON.stringify(this.productos));
    }
    for (let i = 0; i < totalPago.length; i++) {
      totalPago[i].totalcarrito = carritoTotal;
      localStorage.setItem('totalcarrito', JSON.stringify(totalPago));
    }
    if (localStorage.getItem('productos') === null) {
      this.productos = [];
    } else {
      this.productos = JSON.parse(localStorage.getItem('productos'));
    }
    //console.log(this.productos);
    return this.productos;
  }

  getCarritoTotal() {
    if (localStorage.getItem('totalcarrito') === null) {
      this.totalcarrito = [];
      let totalcarrito = [];
      totalcarrito = [{ "totalcarrito": "0" }];
      localStorage.setItem('totalcarrito', JSON.stringify(totalcarrito));
    } else {
      this.totalcarrito = JSON.parse(localStorage.getItem('totalcarrito'));
    }
    //console.log(typeof(totalCarrito));
    //console.log(this.productos);
    return this.totalcarrito;
  }


  /*
  actualizarCarrito() {
    //console.log(JSON.stringify(productos));
    let nuevo = this.productos.filter((valorActual, indiceActual, arreglo) => {
      //Podríamos omitir el return y hacerlo en una línea, pero se vería menos legible
      return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual
    });
    localStorage.setItem('productos', JSON.stringify(nuevo));
  }*/

  /*
  eliminarDuplicados(product: Carrito) {
    let busqueda = product._id;
    let indice = this.productos.findIndex(id => id._id === busqueda);
    for (let i = 0; i < this.productos.length; i++) {
      if (indice) {
        this.productos[i]._id;
        localStorage.setItem('productos', JSON.stringify(this.productos));
      }
    }
  }*/

  addCarrito(product: Carrito) {
    let estado: boolean = false;
    //let TotalCarrito = parseInt(carrito.TotalCarrito);
    for (let i = 0; i < this.productos.length; i++) {
      if (product._id == this.productos[i]._id) {
        Swal.fire({
          icon: 'warning',
          title: 'Este producto ya se encuentra en tu carrito de compras',
          text: 'Este producto no se agrego a tu carrito porque ya lo habias agregado'
        });
        estado = true;
      }
    }
    /*
    for (let i = 0; i < this.totalcarrito.length; i++) {
      let precioProducto = parseInt(product.totalpago);
      let TotalCarrito = parseInt(this.totalcarrito[i].totalcarrito);
      let sumarTotalCarrito = precioProducto + TotalCarrito;
      let totalActualizado = JSON.stringify(sumarTotalCarrito);
      this.totalcarrito[i].totalcarrito = totalActualizado;
      localStorage.setItem('totalcarrito', JSON.stringify(this.totalcarrito[i].totalcarrito));
    }*/
    //console.log(this.totalcarrito);
    this.productos.push(product);
    let productos = [];
    if (localStorage.getItem('productos') === null) {
      productos = [];
      productos.push(product);
      localStorage.setItem('productos', JSON.stringify(productos));
    } else if (estado == false) {
      //productos contiene todo el objeto de todos los productos agregados al carrito
      productos = JSON.parse(localStorage.getItem('productos'));
      productos.push(product);
      localStorage.setItem('productos', JSON.stringify(productos));
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado',
        text: 'Este producto se agrego correctamente a tu carrito de compras'
      });
    }
  }

  sumar(producto: Carrito) {
    for (let i = 0; i < this.productos.length; i++) {
      if (producto == this.productos[i]) {
        //console.log(this.productos[i].nombre);
        if (producto.cantidad != producto.stock) {
          let sumar = parseInt(producto.cantidad);
          let sumarCarrito = sumar + 1;
          let actualizado = JSON.stringify(sumarCarrito);
          producto.cantidad = actualizado;
          let sumarPrecio = parseInt(producto.precio);
          let precioFijo = parseInt(producto.totalpago);
          let aumentarPrecio = sumarPrecio + precioFijo;
          let precioActualizado = JSON.stringify(aumentarPrecio);
          producto.totalpago = precioActualizado;
        } else {
          producto.cantidad = producto.stock;
          Swal.fire({
            icon: 'error',
            title: 'Error!!',
            text: 'No puede comprar mas productos porque ya no hay mas en inventario'
          });
        }
        localStorage.setItem('productos', JSON.stringify(this.productos));
      }
    }
  }

  restar(producto: Carrito) {
    for (let i = 0; i < this.productos.length; i++) {
      if (producto == this.productos[i]) {
        if (producto.cantidad != '1') {
          let restar = parseInt(producto.cantidad);
          let restarCarrito = restar - 1;
          let actualizado = JSON.stringify(restarCarrito);
          producto.cantidad = actualizado;
          let restarPrecio = parseInt(producto.precio);
          let precioFijo = parseInt(producto.totalpago);
          let disminuirPrecio = precioFijo - restarPrecio;
          let precioActualizado = JSON.stringify(disminuirPrecio);
          producto.totalpago = precioActualizado;
        } else {
          producto.cantidad = '1';
          Swal.fire({
            icon: 'error',
            title: 'Error, no puede pedir menos de un producto',
            text: 'Si no quiere este producto eliminelo de su carrito de compras'
          });
        }
        localStorage.setItem('productos', JSON.stringify(this.productos));
      }
    }
  }


  deleteProductCarrito(producto: Carrito) {
    for (let i = 0; i < this.productos.length; i++) {
      if (producto == this.productos[i]) {
        this.productos.splice(i, 1);
        localStorage.setItem('productos', JSON.stringify(this.productos));
      }
      if (this.productos.length === 0) {
        document.location.reload();
      }
    }
  }

  getProducts(page = 1): Observable<any> {
    //Hacer petición ajax
    return this._http.get(this.url + 'productos/' + page);
  }

  getProductDetail(id): Observable<any> {
    //Hacer petición ajax
    return this._http.get(this.url + 'producto/' + id);
  }

  update(token, id, product): Observable<any> {
    //Convierte el objeto del usuario en un json string
    let params = JSON.stringify(product);

    //Definimos las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    //Hacer petición ajax
    return this._http.put(this.url + 'producto/' + id, params, { headers: headers });
  }

  delete(token, id): Observable<any> {
    //Definimos las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);

    //Hacer petición ajax
    return this._http.delete(this.url + 'producto/' + id, { headers: headers });
  }

}