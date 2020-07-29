import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [UserService, ProductoService]
})
export class AddProductComponent implements OnInit {

  public page_title: string;
  public producto: Producto;
  public identity;
  public token;
  public status;

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
    this.page_title = 'Crear nuevo Producto';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.producto = new Producto('', '', '', '', '', null, null, null,  null, this.identity._id, null);
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._productService.addProduct(this.token, this.producto).subscribe(
      response => {
        if (response.producto) {
          this.status = 'success';
          this.producto = response.producto;
          form.reset();
          Swal.fire({
            icon: 'success',
            title: 'Guardado',
            text: 'El producto se ha guardado correctamente'
          });
        } else {
          this.status = 'error';
          Swal.fire({
            icon: 'error',
            title: 'Error!!',
            text: 'El producto no se ha guardado correctamente'
          });
        }

      },
      error => {
        this.status = 'error';
        Swal.fire({
          icon: 'error',
          title: 'Error!!',
          text: 'El producto no se ha guardado correctamente'
        });
        console.log(error);
      }
    );
  }

  imagenUpload(data) {
    this.producto.imagen = data.body.imagen;
  } 

  imagenUpload2(data) {
    this.producto.imagen2 = data.body.imagen2;
  } 

  imagenUpload3(data) {
    this.producto.imagen3 = data.body.imagen3;
  } 

}
