import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Restaurant from '../../../models/restaurant';
import { RestaurantsService } from '../../../services/restaurants.service';
import Menu from '../../../models/menu';
import { MenuItemsService } from '../../../services/menu-items.service';
import { RestaurantRatingsService } from '../../../services/restaurant-ratings.service';
import RestaurantRating from 'src/app/models/restaurantRating';
import { TokenStorageService } from '../../../services/token-storage.service';



@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {
  @ViewChild('addForm') addForm;
  @ViewChild('editForm') editForm;

  restaurants: Restaurant[] = [];

  selectedIndex: number;
  selectedId: number;
  image: string;
  name: string;
  city: string;
  phone: string;
  latitude: string;
  longitude: string;

  isAdmin: boolean;

  constructor(private restaurantsService: RestaurantsService,
              private menuService: MenuItemsService,
              private restaurantRatingsService: RestaurantRatingsService,
              private token: TokenStorageService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.isAdmin = this.token.getUser().role == 1 ? true : false;

    this.http.get<Restaurant[]>('http://localhost:5000/api/restaurant').subscribe(
      res => {
        this.restaurantsService.setRestaurants(res);
        this.restaurants = res;
      }
    );

    this.http.get('http://localhost:5000/api/rating').subscribe(
      (ratings: RestaurantRating[]) => this.restaurantRatingsService.setRatings(ratings)
    );

    this.http.get<Menu[]>('http://localhost:5000/api/menu').subscribe(
      menu => {
        this.menuService.setMenu(menu);
      }
    );

    this.restaurantsService.restaurantsChanged.subscribe(
      restaurant => this.restaurants = restaurant
    );
  }

  onSort(city: number) {
    this.restaurants = [];
    switch(city) {
      case 1: this.restaurantsService.getAll().map(restaurant => {
                if (restaurant.city.toLocaleLowerCase() == 'hebron')
                  this.restaurants.push(restaurant);
              });
              break;

      case 2: this.restaurantsService.getAll().map(restaurant => {
                if (restaurant.city.toLocaleLowerCase() == 'nablus')
                  this.restaurants.push(restaurant);
            });
            break;

      case 3: this.restaurantsService.getAll().map(restaurant => {
                if (restaurant.city.toLocaleLowerCase() == 'ramallah')
                  this.restaurants.push(restaurant);
              });
              break;
    }
  }

  onEdit(restaurant) {
    this.selectedIndex = restaurant.selectedIndex;
    this.selectedId = restaurant.selectedId;
    this.name = restaurant.name;
    this.city = restaurant.city;
    this.phone = restaurant.phone;
    this.latitude = restaurant.latitude;
    this.longitude = restaurant.longitude;
  }

  onFileSelected(event) {
    this.image = event.target.files[0];
  }

  onAdd() {
    let value = this.addForm.value;

    this.restaurantsService.add({
      name: value.name,
      city: value.city,
      lat: value.latitude,
      lng: value.longitude,
      phone: value.phone,
      image: this.image
    });

    this.addForm.reset();
  }

  onFormEdit() {
    this.restaurantsService.update(this.selectedIndex, this.selectedId, {image: this.image, name: this.name, city: this.city, phone: this.phone, lat: this.latitude, lng: this.longitude});
  }
}
