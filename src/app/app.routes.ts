import { Routes } from '@angular/router';
import { homedir } from 'node:os';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { LogInComponent } from './layout/pages/log-in/log-in.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotFoundComponent } from './layout/addition/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { ProductDetailsComponent } from './layout/addition/product-details/product-details.component';
import { ShippingAddressComponent } from './layout/addition/shipping-address/shipping-address.component';
import { AllOrdersComponent } from './layout/addition/all-orders/all-orders.component';

export const routes: Routes = [
  {path:"", redirectTo:"home",pathMatch:'full'},
  //                                  guard
  {path:"home",component:HomeComponent,canActivate:[authGuard]},
  {path:"cart",component:CartComponent ,canActivate:[authGuard]},
  {path:"setting",loadChildren: ()=> import('./setting/setting.module').then( (m)=>m.SettingModule ) ,canActivate:[authGuard]},
  {path:"allorders",component:AllOrdersComponent ,canActivate:[authGuard]},
  {path:"shippingAddress/:cartId",component:ShippingAddressComponent ,canActivate:[authGuard]},
  {path:"products",component:ProductsComponent ,canActivate:[authGuard]},
  {path:"brands",component:BrandsComponent ,canActivate:[authGuard]},
  {path:"categories",component:CategoriesComponent,canActivate:[authGuard]},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LogInComponent},
  {path:"productdetails/:id",component:ProductDetailsComponent,canActivate:[authGuard]},
  {path:"**",component:NotFoundComponent},
];
