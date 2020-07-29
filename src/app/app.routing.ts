// Imports necesarios
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';
import { AdminGuard } from './services/admin.guard';

//Importar componentes
import { HomeComponent } from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
 
//Definir Rutas
//Aqui se van a cargar los componentes de la ruta que yo les especifique en el navegador
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'login', canActivate: [NoIdentityGuard], component: LoginComponent},
  {path: 'registro', canActivate: [NoIdentityGuard], component: RegisterComponent},
  {path: 'ajustes', canActivate: [UserGuard], component: UserEditComponent},
  {path: 'usuarios', component: UsersComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'productos/:page', component: ProductosComponent},
  {path: 'producto-detail/:id', component: ProductDetailComponent},
  {path: 'guardar/producto', component: AddProductComponent},
  {path: 'producto/:id', component: EditProductComponent},
  {path: 'acciones', component: ProductsAdminComponent},
  {path: 'acciones/:page', component: ProductsAdminComponent},
  {path: 'carrito/:id', component: CarritoComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: '**', component: HomeComponent}/*El ** significa que lanzara el error que pusimos anteriormente
  y siempre debe ir al final porque si no el resto de rutas no van a funcionar*/
];

//Exportar configuración
export const appRoutingProviders: any[] = [];//Esto sirve para cargar el router como servicio
/*El routing va a ser el modulo del router que eso una vez que lo carguemos dentro del appmodule
va a permitir que toda la configuración de rutas funcione
*/
//El  modulewithproviders es el tipo de dato que va ser el routing
/*Con el router module estamos pasando el modulo de rutas con el metodo forRoot y le pasamos tambien
las rutas que tenemos en nuestro array de rutas*/
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
