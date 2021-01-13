import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantsListComponent } from './components/restaurants/restaurants-list/restaurants-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RestaurantOrdersComponent } from './components/restaurants/restaurant-orders/restaurant-orders.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';;

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantsComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: RestaurantsListComponent},
    { path: 'menu/:rest_id', component: MenuComponent, canActivate: [AuthGuardService] },
    { path: 'orders/:rest_id', component: RestaurantOrdersComponent, canActivate: [AuthGuardService] }
  ]},
  { path: 'orders/:customer_id', component: OrdersComponent, canActivate: [AuthGuardService] },
  { path: 'auth', component: AuthComponent, children: [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ]},
  { path: '**', redirectTo: '/restaurants'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
