import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }from '@angular/router';/*Servicio para sacar
parametros de la url*/
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]//Aqui cargamos el servicio
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _userService: UserService,//Y aqui lo injectamos
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
  }


  ngOnInit(): void {
  }

  onSubmit(form) {
    //CONSEGUIR OBJETO COMPLETO DEL USUARIO LOGUEADO
    this._userService.signup(this.user).subscribe(
      response => {

        if (response.user && response.user._id) {

          //GUARDAMOS EL USUARIO EN UNA PROPIEDAD
          this.identity = response.user;
          //Aqui guardamos el objeto del usuario en el localstorage pero en formato json string, no en un ubjeto porque no lo acepta en este formato
          localStorage.setItem('identity', JSON.stringify(this.identity));

          //CONSEGUIR EL TOKEN DEL USUARIO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe(
            response => {
      
              if (response.token) {
                 //GUARDAR EL TOKEN DEL USUARIO EN UNA PROPIEDAD
                 this.token = response.token;
                 //Aqui no lo pasamos a string porque el token ya es un string como tal
                 localStorage.setItem('token', this.token);

                 this.status = 'success';
                 this._router.navigate(['/inicio']);
              } else {
                this.status = 'error';
              }
            },
            error => {
              this.status = 'error';
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
        }
        form.reset();
      },
      error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

}
