export class User{
    //Dentro del constructor definiremos las propiedades que va tener el objeto
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public imagen: string,
        public role: string
    ){}
}