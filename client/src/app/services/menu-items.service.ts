import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';

import Menu from '../models/menu'

const url: string = 'http://localhost:5000/api/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  private menu: Menu[] = [];

  menuChanged = new Subject<Menu[]>();

  constructor(private storage: DataStorageService) { }

  setMenu(menu: Menu[]) {
    this.menu = menu;

    this.menuChanged.next(this.menu);
  }

  getAll(rest_id: number) {
    let menuItems: Menu[] = [];
    this.menu.map(item => {
      if (item.rest_id == rest_id)
        menuItems.push(item);
    });

    return menuItems;
  }

  getMenuById(id: number) {
    let menuItem;
    this.menu.map(
      item => {
        if (item.id == id)
          menuItem = item;
    });

    return menuItem;
  }

  add(menu: any) {
    let fd = new FormData();

    fd.append('rest_id', menu.rest_id);
    fd.append('name', menu.name);
    fd.append('description', menu.description);
    fd.append('price', menu.price);
    fd.append('image', menu.image);

    this.storage.post(url, fd).subscribe(flag => {
        this.storage.get(url).subscribe((menu: Menu[]) => this.setMenu(menu));
    });
  }

  update(index: number, id: number, newMenu: any) {
    /*if (newMenu.image) {
      this.menu[index].image = newMenu.image;
    }
    this.menu[index].name = newMenu.name;
    this.menu[index].description = newMenu.description;
    this.menu[index].price = newMenu.price;
*/
    let fd = new FormData();

    fd.append('image', newMenu.image);
    fd.append('rest_id', newMenu.rest_id);
    fd.append('name', newMenu.name);
    fd.append('description', newMenu.description);
    fd.append('price', newMenu.price);

    this.storage.put(`${url}/${id}`, fd).subscribe(flag => {
      this.storage.get(url).subscribe((menu: Menu[]) => this.setMenu(menu));
  });

    this.menuChanged.next(this.menu);
  }

  remove(index: number, id: number) {
    this.menu.splice(index+1, 1);

    this.storage.delete(`${url}/${id}`).subscribe();

    this.menuChanged.next(this.menu);
  }
}
