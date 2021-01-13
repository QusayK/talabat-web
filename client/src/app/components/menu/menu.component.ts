import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import Menu from '../../models/menu';
import { MenuItemsService } from '../../services/menu-items.service'
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('form') form;
  @ViewChild('editForm') editForm;

  selectedId: number;
  selectedIndex: number;
  image: string;
  name: string;
  desc: string;
  price: number;

  menuItems: Menu[] = [];
  rest_id: number;

  constructor(private menuService: MenuItemsService, private route: ActivatedRoute, private storage: DataStorageService) { }

  ngOnInit(): void {
    this.storage.get('http://localhost:5000/api/menu').subscribe((menus: Menu[]) => {
      this.menuService.setMenu(menus);
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.rest_id = +params['rest_id'];
      }
    );

    this.menuService.menuChanged.subscribe(
      flag => {
        this.getMenu()
      }
    );
  }

  onFileSelected(event) {
    this.image = event.target.files[0];
  }

  getMenu() {
    this.menuItems = this.menuService.getAll(this.rest_id);
  }

  onSubmit() {
    let value = this.form.value;

    this.menuService.add({
      rest_id: this.rest_id,
      name: value.name,
      description: value.desc,
      price: value.price,
      image: this.image
    });

    this.form.reset();
  }

  onEditMode(menu: any) {
    this.selectedId = menu.selectedId;
    this.selectedIndex = menu.selectedIndex;
    this.name = menu.name;
    this.desc = menu.description;
    this.price = menu.price;
  }

  onEdit() {
    let value = this.editForm.value;

    this.menuService.update(this.selectedIndex, this.selectedId, {name: value.name, rest_id: this.rest_id, description: value.desc, price: value.price, image: this.image});
  }
}
