import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service'; 
import { global } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css'],
  providers: [ProductoService, UserService]
})
export class ProductsAdminComponent implements OnInit {
  public page_title: string;
  public productos: Producto[];
  public identity;
  public token;
  public url: string;
  public totalPages;
  public page;
  public next_page;
  public prev_page;
  public number_pages;
  public no_paginate;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductoService,
    private _userService: UserService
  ) {
    this.page_title = 'Acciones de administrador';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      //El mas se utiliza cuando se esta sacando un numero y no un string 
      var page = +params['page'];

      if(!page){
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }

      this.getProducts(page);
   });
  }

  getProducts(page = 1) {  
    this._productService.getProducts(page).subscribe(
      response => {
        if(response.productos){
          this.productos = response.productos;

          //Navegación de paginación
          this.totalPages = response.totalPages;

          var number_pages = [];
          for(var i = 1; i <= this.totalPages; i++){
              number_pages.push(i);
          }

          this.number_pages = number_pages;

          if(page >= 2){
              this.prev_page = page-1;
          }else{
            this.prev_page = 1;
          }

          if(page < this.totalPages){
            this.next_page = page+1;
          }else{
            this.next_page = this.totalPages;
          }

        }else{
          this._router.navigate(['/inicio']);
        }

      }, 
      error => {
        console.log(error);
      }
    );
}

deleteProduct(id) {  
  this._productService.delete(this.token, id).subscribe(
    response => {
      this.getProducts();
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El producto se ha eliminado correctamente'
      });
    }, 
    error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error!!',
        text: 'El producto no se ha eliminado correctamente'
      });
    }
  );
}

}
