import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Carrito } from '../../models/carrito';
import { TotalCarrito } from '../../models/totalcarrito';
import { UserService } from '../../services/user.service';
import { ProductoService } from '../../services/producto.service';
import { global } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [UserService, ProductoService]
})
export class CarritoComponent implements OnInit {

  public page_title: string;
  public producto: Carrito[];
  public totalcarrito: TotalCarrito[];
  public status;
  public url: string;
  //public cont:number = 1;


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductoService
  ) {
    this.page_title = 'Mi carrito';
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getProduct();

    this.producto = this._productService.getCarrito();
    this.totalcarrito = this._productService.getCarritoTotal();
    if(this.producto.length === 0){
      this.status = 'false'
    }else{
      this.status = 'true'
    }
  }

  getProduct() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._productService.getProductDetail(id).subscribe(
        response => {
          if (!response.producto) {
            this._router.navigate(['/productos']);
            Swal.fire({
              icon: 'error',
              title: 'Error!!',
              text: 'Este producto no se agrego correctamente a tu carrito de compras'
            });
          } else {
            this.status = 'false';
            this.producto = response.producto;
            var idResponse = response.producto._id;
            var nombreResponse = response.producto.nombre;
            var descripcionResponse = response.producto.descripcion;
            var precioResponse = response.producto.precio;
            var stockResponse = response.producto.stock;
            var imagenResponse = response.producto.imagen;
            var dateResponse = response.producto.data;
            var userResponse = JSON.stringify(response.producto.user);
            var commentsResponse = JSON.stringify(response.producto.comments);
            //localStorage.setItem('carrito',  JSON.stringify(productos));
            //console.log(typeof(idResponse));
            this._productService.addCarrito({
              _id: idResponse,
              nombre: nombreResponse,
              descripcion: descripcionResponse,
              stock: stockResponse,
              precio: precioResponse,
              imagen: imagenResponse,
              cantidad: '1',
              totalpago: precioResponse,
              date: dateResponse,
              user: userResponse,
              comments: commentsResponse
            });
            this.status = 'success';
            if(this.status = 'success'){
              this._router.navigate(['/productos']);
            }
          }
        },
        error => {
          console.log(error);
        }
      )


    });
  }

  guardarCompra(){
    this._productService.guardarCarrito().subscribe(
      response => {
        if (response.params) {
          this.producto = response.producto;
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'Tu compra se ha guardado correctamente'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!!',
            text: 'Tu compra no se ha guardado correctamente'
          });
        }

      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error!!',
          text: 'Tu compra no se ha guardado correctamente'
        });
        console.log(error);
      }
    );
  }

  sumarContador(carrito: Carrito){
     this._productService.sumar(carrito);
  }

  restarContador(carrito: Carrito){
    this._productService.restar(carrito);
 }

  deleteProductCarrito(carritoProducto: Carrito) {
   /* if(confirm('Are you sure you want to delete this task?')) {
      this._productService.deleteProductCarrito(carritoProducto);
    }*/
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro de eliminar este producto de tu carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, lo quiero eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._productService.deleteProductCarrito(carritoProducto);
        if(result){
          swalWithBootstrapButtons.fire(
            'Eliminado!!',
            'Este producto se ha eliminado de tu carrito de compras',
            'success'
          )
        }else{
          swalWithBootstrapButtons.fire(
            'Error!!',
            'Hubo un error y no se pudo eliminar este producto correctamente, por favor intentalo de nuevo',
            'success'
          )
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Este producto sigue en tu carrito de compras',
          'error'
        )
      }
    })
  }

}
