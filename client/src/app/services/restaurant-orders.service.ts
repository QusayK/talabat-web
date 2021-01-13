import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import Order from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class RestaurantOrdersService {
  ordersChanged = new Subject<Order[]>();

  orders: Order[] = [];

  constructor() { }

  getAll() {
    return this.orders;
  }

  getOrdersForRestaurant(rest_id: number) {
    let restaurantOrders: Order[] = [];
    this.orders.map(order => {
      if (order.rest_id == rest_id)
        restaurantOrders.push(order);
    });

    return restaurantOrders;
  }

  getOrdersForRestaurantMenu(rest_id: number, menu_id: number) {
    let restaurantOrder: Order;

    this.orders.map(order => {
      if (order.rest_id == rest_id && order.menu_id == menu_id)
        restaurantOrder = order;
    });

    return restaurantOrder;
  }

  addArray(orders: Order[]) {
    orders.map(
      order => {
        if (this.orders.length == 0) {

          this.orders.push(order);
        } else {

          let customers_ids = this.orders.map(item => item.customer_id);
          let items_ids = this.orders.map(item => item.menu_id);

          if (customers_ids.includes(order.customer_id)) {

            if (items_ids.includes(order.menu_id)) {

              let index = items_ids.indexOf(order.menu_id);
              this.orders[index].quantity += order.quantity;
            } else {

              this.orders.push(order);
            }
          }
        }
      }
    );

    this.ordersChanged.next(this.orders);
  }

  add(order: Order) {
    this.orders.push(order);

    this.ordersChanged.next(this.orders);
  }

  update(index: number, newOrder: Order) {
    this.orders[index] = newOrder;

    this.ordersChanged.next(this.orders);
  }

  remove(index: number) {
    this.orders.splice(index, 1);

    this.ordersChanged.next(this.orders);
  }
}
