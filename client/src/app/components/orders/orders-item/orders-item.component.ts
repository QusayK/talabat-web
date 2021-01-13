import { Component, Input, OnInit } from '@angular/core';

import Menu from 'src/app/models/menu';
import { OrdersService } from 'src/app/services/orders.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss']
})
export class OrdersItemComponent implements OnInit {
  @Input() item: Menu;
  @Input() customer_id: number;
  @Input() index: number;

  quantity: number;
  restaurantName: string;

  constructor(private ordersService: OrdersService, private restaurantService: RestaurantsService) { }

  ngOnInit(): void {
    this.restaurantName = this.restaurantService.getRestaurantById(this.item.rest_id).name;
    this.getQuantity();
  }

  getQuantity() {
    this.quantity = this.ordersService.getOrderForCustomerMenu(this.item.id, this.customer_id).quantity;
  }

  onDelete() {
    let order_id: number = this.ordersService.getOrderForCustomerMenu(this.item.id, this.customer_id).id;
    this.ordersService.remove(this.index, order_id);
  }
}
