import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';

import Order from '../models/order';
import { MenuItemsService } from './menu-items.service';

const url: string = 'http://localhost:5000/api/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  ordersChanged = new Subject<Order[]>();

  private orders: Order[] = [];
  total_price = 0;

  constructor(private menuItemsService: MenuItemsService, private storage: DataStorageService) { }

  setOrders(orders: Order[]) {
    this.orders = orders;

    this.ordersChanged.next(this.orders);
  }

  setTotalPrice(total_price: number) {
    this.total_price = total_price;
  }

  getAll() {
    return this.orders;
  }

  getOrderById(id: number) {
    let order: Order;
    this.orders.map(
      item => {
        if (item.id == id)
          order = item;
      }
    );

    return order;
  }

  getOrdersForRestaurantCustomer(rest_id: number, customer_id: number) {
    let restaurantOrder: Order[] = [];

    this.orders.map(order => {
      if (order.rest_id == rest_id && order.customer_id == customer_id)
        restaurantOrder.push(order);
    });

    return restaurantOrder;
  }

  getOrdersForCustomer(customer_id: number) {
    let customerOrders: Order[] = [];

    this.orders.map(order => {
      if (order.customer_id == customer_id)
        customerOrders.push(order);
    });

    return customerOrders;
  }

  getOrderForCustomerMenu(menu_id: number, customer_id: number) {
    let customerOrder: Order;

    this.orders.map(
      order => {
        if (order.menu_id == menu_id && order.customer_id == customer_id)
          customerOrder = order;
      }
    );

    return customerOrder;
  }

  add(order: any) {
    if (this.orders.length == 0) {
      this.storage.post(url, order).subscribe(flag => {
        this.storage.get(url).subscribe(
          (orders: Order[]) => this.setOrders(orders)
        );
      });
    } else {

      let customerOrders = this.orders.filter(_order => _order.customer_id == order.customer_id);
      let customerOrdersMenus = customerOrders.map(_order => _order.menu_id);

      if (customerOrdersMenus.includes(order.menu_id)) {
        let _index = customerOrdersMenus.indexOf(order.menu_id);
        let customerOrder = customerOrders[_index];

        let index = this.orders.indexOf(customerOrder);
        this.orders[index].quantity += order.quantity;

        this.update(this.orders[index].id, this.orders[index]);
      } else {
        this.storage.post(url, order).subscribe(flag => {
          this.storage.get(url).subscribe(
            (orders: Order[]) => this.setOrders(orders)
          );
        });
      }
    }

    this.total_price += this.menuItemsService.getMenuById(order.menu_id).price*order.quantity;
    this.ordersChanged.next(this.orders);
  }

  update(id: number, newOrder: Order) {
    this.storage.put(`${url}/${id}`, newOrder).subscribe();

    this.ordersChanged.next(this.orders);
  }

  remove(index: number, id: number) {
    let orderToRemove = this.orders[index];
    this.total_price -= this.menuItemsService.getMenuById(orderToRemove.menu_id).price*orderToRemove.quantity;

    this.orders.splice(index, 1);
    this.storage.delete(`${url}/${id}`).subscribe();

    this.ordersChanged.next(this.orders);
  }

  onSendOrders(customer_id: number) {
    this.total_price = 0;
    this.orders = this.orders.filter(order => {
      //this.total_price -= this.menuItemsService.getMenuById(order.menu_id).price*order.quantity;
      return order.customer_id != customer_id;
    });

    this.storage.delete(`${url}/customer/${customer_id}`).subscribe();

    this.ordersChanged.next(this.orders);
  }
}
