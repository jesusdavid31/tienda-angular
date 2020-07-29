import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Producto } from '../../models/producto';
import { UserService } from '../../services/user.service';
import { ProductoService } from '../../services/producto.service';
import { global } from '../../services/global';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [UserService, ProductoService]
})
export class ProductDetailComponent implements OnInit {

  public producto: Producto;
  public identity;
  public token;
  public url: string;

  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _productService: ProductoService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getProduct();
    console.log(this.producto);
  }

  getProduct() {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this._productService.getProductDetail(id).subscribe(
        response => {
          if (!response.producto) {
            this._router.navigate(['/productos']);
          } else {
            this.producto = response.producto;
          }
        },
        error => {
          console.log(error);
        }
      )


    });
  }

}
