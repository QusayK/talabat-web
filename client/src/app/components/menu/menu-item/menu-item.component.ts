import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { MenuItemsService } from 'src/app/services/menu-items.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Menu from '../../../models/menu';
import { OrdersService } from '../../../services/orders.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() menu: Menu;
  @Input() index: number;
  @Output() onEdit = new EventEmitter<any>();

  customer_id: number;
  quantity: number = 1;

  isAdmin: boolean;

  constructor(private ordersService: OrdersService,
              private menuService: MenuItemsService,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.customer_id = this.token.getUser().id;
    this.isAdmin = this.token.getUser().role == 1 ? true : false;
  }

  onAdd() {
    this.ordersService.add({
      rest_id: this.menu.rest_id,
      menu_id: this.menu.id,
      customer_id: this.customer_id,
      quantity: this.quantity
    });
  }

  onEditMode() {
    this.onEdit.emit({
      selectedId: this.menu.id,
      selectedIndex: this.index,
      name: this.menu.name,
      description: this.menu.description,
      price: this.menu.price
    });
  }

  onDelete() {
    this.menuService.remove(this.index, this.menu.id);
  }
}
