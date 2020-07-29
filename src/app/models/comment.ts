export class Comment{
    //Dentro del constructor definiremos las propiedades que va tener el objeto
    constructor(
        public _id: string,
        public content: string,
        public date: string,
        public user: any
    ){}
}