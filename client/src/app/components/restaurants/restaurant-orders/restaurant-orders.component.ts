import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantsService } from 'src/app/services/restaurants.service';

import Menu from 'src/app/models/menu';
import { MenuItemsService } from 'src/app/services/menu-items.service';
import { RestaurantOrdersService } from '../../../services/restaurant-orders.service';
import { Subscription } from 'rxjs';
import Restaurant from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.scss']
})
export class RestaurantOrdersComponent implements OnInit, OnDestroy {
  orders: Menu[];
  rest_id: number;
  restaurant: Restaurant;

  subscription: Subscription;

  constructor(private restaurantOrdersService: RestaurantOrdersService,
              private restaurantsService: RestaurantsService,
              private menuItemsService: MenuItemsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => this.rest_id = params['rest_id']
    );

    this.subscription = this.restaurantOrdersService.ordersChanged.subscribe(
      flag => this.getOrders()
    );

    this.restaurant = this.restaurantsService.getRestaurantById(this.rest_id);
    this.getOrders();
  }

  getOrders() {
    this.orders = this.restaurantOrdersService.getOrdersForRestaurant(this.rest_id).map(
      order => this.menuItemsService.getMenuById(order.menu_id)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
