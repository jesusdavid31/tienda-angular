export class Producto{
    //Dentro del constructor definiremos las propiedades que va tener el objeto
    constructor(
        public _id: string,
        public nombre: string,
        public descripcion: string,
        public precio: string,
        public stock: string,
        public imagen: string,
        public imagen2: string,
        public imagen3: String,
        public date: string,
        public user: any,
        public comments: any
    ){}
}