export class Carrito{
    //Dentro del constructor definiremos las propiedades que va tener el objeto
    constructor(
        public _id: string,
        public nombre: string,
        public descripcion: string,
        public precio: string,
        public stock: string,
        public imagen: string,
        public cantidad: string,
        public totalpago: string,
        public date: string,
        public user: any,
        public comments: any
    ){}
}