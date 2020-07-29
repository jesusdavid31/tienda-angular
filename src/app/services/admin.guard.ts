//El injectable es para utilizar este servicio cualquier componente
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

//El injectable es inyectar esta clase en cualquier componente
/* Esto que estamos usando es un guard en angular, es decir sirve para proteger las rutas
   si el usuario no esta identificado, y todo eso lo hace el CanActivate
*/
@Injectable()
export class AdminGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _userService: UserService
    ){
    }

    canActivate(){
        let identity = this._userService.getIdentity();

        if(identity && identity.role === 'ROLE_ADMIN'){
            return true;
        }else{
            this._router.navigate(['/']);
            return false;
        }
    }
}