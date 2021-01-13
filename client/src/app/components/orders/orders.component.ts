import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import Menu from 'src/app/models/menu';
import Order from 'src/app/models/order';
import { MenuItemsService } from 'src/app/services/menu-items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { RestaurantOrdersService } from 'src/app/services/restaurant-orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  customer_id: number;
  orders: Order[] = [];
  menu: Menu[];
  item: any[];
  total_price: number;

  subscription: Subscription;

  constructor(private ordersService: OrdersService,
              private menuItemsService: MenuItemsService,
              private restaurantOrderService: RestaurantOrdersService,
              private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => this.customer_id = +params['customer_id']
    );

    this.http.get('http://localhost:5000/api/order').subscribe(
      (orders: Order[]) => {

        this.ordersService.setOrders(orders);

       if (this.total_price == 0) {
          let _orders = orders.filter(order => order.customer_id == this.customer_id);

          _orders.map(item => {
            this.total_price += this.menuItemsService.getMenuById(item.menu_id).price*item.quantity;
            this.ordersService.setTotalPrice(this.total_price);
          });
       }
      }
    );

    this.subscription = this.ordersService.ordersChanged.subscribe(
      flag => {
        this.getOrders();
        this.total_price = this.ordersService.total_price;
      }
    );
  }

  getOrders() {
    this.orders = this.ordersService.getOrdersForCustomer(this.customer_id);

    this.menu = this.orders.map(
      order => this.menuItemsService.getMenuById(order.menu_id)
    );
  }

  onSendOrders() {
    this.restaurantOrderService.addArray(this.orders);

    this.ordersService.onSendOrders(this.customer_id);
    this.orders = [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
