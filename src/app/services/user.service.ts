//El injectable es para utilizar este servicio cualquier componente
import { Injectable } from '@angular/core';
//El HttpClient, HttpHeaders sirve para hacer peticiones ajax añ backend
import { HttpClient, HttpHeaders } from '@angular/common/http';
//El observable sirve para recibir los resultados que nos devuelva el api
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

//El injectable es inyectar esta clase en cualquier componente
@Injectable()
export class UserService {
    public url: string;
    public identity;
    public token;


    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    prueba() {
        return "Hola mundo desde un servicio!!";
    }

    register(user): Observable<any> {
        //Convierte el objeto del usuario en un json string
        let params = JSON.stringify(user);

        //Definimos las cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Hacer petición ajax
        return this._http.post(this.url + 'register', params, { headers: headers });
    }

    signup(user, gettoken = null): Observable<any> {

        //Comprobar si llega gettoken
        if (gettoken != null) {
            user.gettoken = gettoken;
        }

        //Convierte el objeto del usuario en un json string
        let params = JSON.stringify(user);

        //Aqui le decimos el tipo de contenido que va a ser es decir un html normal
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //Hacer petición ajax
        return this._http.post(this.url + 'login', params, { headers: headers });
    }

    getIdentity() {
        //Lo que yo tenga en identity que es un objeto en json string
        //Esto me lo va convertir en un objeto de javascript usable
        let identity = JSON.parse(localStorage.getItem('identity'));

        if (identity && identity != null && identity != undefined && identity != "undefined") {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        //Lo que yo tenga en identity que es un objeto en json string
        //Esto me lo va convertir en un objeto de javascript usable
        let token = localStorage.getItem('token');

        if (token && token != null && token != undefined && token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    
    update(user): Observable<any> {
        //Convierte el objeto del usuario en un json string
        let params = JSON.stringify(user);

        //Definimos las cabeceras
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken());

        //Hacer petición ajax
        return this._http.put(this.url + 'user/update', params, { headers: headers });
    }

    getUsers(): Observable<any> {
        //Hacer petición ajax
        return this._http.get(this.url + 'users');
    }

    getUser(userId): Observable<any> {
        //Hacer petición ajax
        return this._http.get(this.url + 'user/' + userId);
    }

}

