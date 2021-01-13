import { Component, Input, OnInit } from '@angular/core';

import Restaurant from 'src/app/models/restaurant';
import { RestaurantOrdersService } from 'src/app/services/restaurant-orders.service';
import Menu from '../../../../models/menu';

@Component({
  selector: 'app-restaurant-orders-item',
  templateUrl: './restaurant-orders-item.component.html',
  styleUrls: ['./restaurant-orders-item.component.scss']
})
export class RestaurantOrdersItemComponent implements OnInit {
  @Input() order: Menu;
  @Input() restaurant: Restaurant;
  @Input() rest_id: number;
  @Input() index: number;

  quantity: number;

  constructor(private restaurantOrdersService: RestaurantOrdersService) { }

  ngOnInit(): void {
    this.getQuantity();
  }

  getQuantity() {
    this.quantity = this.restaurantOrdersService.getOrdersForRestaurantMenu(this.restaurant.id, this.order.id).quantity;
  }
}
