import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Producto } from '../../models/producto';
import { UserService } from '../../services/user.service';
import { ProductoService } from '../../services/producto.service';
import { global } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: '../add-product/add-product.component.html',
  //templateUrl: 'edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [UserService, ProductoService]
})
export class EditProductComponent implements OnInit {
  public page_title: string;
  public producto: Producto;
  public identity;
  public token;
  public status;
  public is_edit;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg, .jpeg, .png, .gif",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'upload-image'
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la foto del producto...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  
  afuConfig2 = {
    multiple: false,
    formatsAllowed: ".jpg, .jpeg, .png, .gif",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'upload-image2'
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la foto del producto...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  afuConfig3 = {
    multiple: false,
    formatsAllowed: ".jpg, .jpeg, .png, .gif",
    maxSize: "50",
    uploadAPI: {
      url: global.url + 'upload-image3'
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube la foto del producto...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };


  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _productService: ProductoService
  ) {
    this.page_title = 'Editar Producto';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.producto = new Producto('', '', '', '' , '' , null, null, null, null, this.identity._id, null);
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getProduct();
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

  onSubmit(form) {

    var id = this.producto._id;

    this._productService.update(this.token, id, this.producto).subscribe(
      response => {
        if (response.producto) {
          this.status = 'success';
          this.producto = response.producto;
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'El producto se ha actualizado correctamente'
          });
        } else {
          this.status = 'error';
          Swal.fire({
            icon: 'error',
            title: 'Error!!',
            text: 'El producto no se ha actualizado correctamente'
          });
        }
      },
      error => {
        this.status = 'error';
        Swal.fire({
          icon: 'error',
          title: 'Error!!',
          text: 'El producto no se ha actualizado correctamente'
        });
      }
    );
  }

  
  imagenUpload(data) {
    console.log(data);
    console.log(data.body);
    console.log(data.body.imagen);
    this.producto.imagen = data.body.imagen;
  } 

  imagenUpload2(data) {
    this.producto.imagen2 = data.body.imagen2;
  } 

  imagenUpload3(data) {
    this.producto.imagen3 = data.body.imagen3;
  } 


}
