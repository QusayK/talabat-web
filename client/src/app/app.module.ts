import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantItemComponent } from './components/restaurants/restaurants-list/restaurant-item/restaurant-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu/menu-item/menu-item.component';
import { RestaurantsListComponent } from './components/restaurants/restaurants-list/restaurants-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersItemComponent } from './components/orders/orders-item/orders-item.component';
import { RestaurantOrdersComponent } from './components/restaurants/restaurant-orders/restaurant-orders.component';
import { RestaurantOrdersItemComponent } from './components/restaurants/restaurant-orders/restaurant-orders-item/restaurant-orders-item.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { RegisterComponent } from './components/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    RestaurantItemComponent,
    MenuComponent,
    MenuItemComponent,
    RestaurantsListComponent,
    OrdersComponent,
    OrdersItemComponent,
    RestaurantOrdersComponent,
    RestaurantOrdersItemComponent,
    HeaderComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
