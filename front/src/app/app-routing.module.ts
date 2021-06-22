import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}