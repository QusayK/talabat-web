import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Restaurant from '../models/restaurant';
import { DataStorageService } from './data-storage.service';

const url: string = "http://localhost:5000/api/restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private restaurants: Restaurant[] = [];

  restaurantsChanged = new BehaviorSubject<Restaurant[]>(this.restaurants);
  constructor(private storage: DataStorageService) { }

  setRestaurants(restaurants: Restaurant[]) {
    this.restaurants = restaurants;

    this.restaurantsChanged.next(this.restaurants);
  }

  getAll() {
    return this.restaurants;
  }

  getRestaurantById(rest_id: number) {
    let restaurant;
    this.restaurants.map(
      rest => {
        if (rest.id == rest_id)
          restaurant =  rest;
      }
    );

    return restaurant;
  }

  add(restaurant: any) {
    let fd = new FormData();

    fd.append('name', restaurant.name);
    fd.append('city', restaurant.city);
    fd.append('lat', restaurant.lat);
    fd.append('lng', restaurant.lng);
    fd.append('phone', restaurant.phone);
    fd.append('image', restaurant.image);
    this.restaurants.push(restaurant);

    this.storage.post(url, fd).subscribe(res => {
      this.storage.get(url).subscribe((res: Restaurant[]) => this.setRestaurants(res));
    });

  }

  update(index: number, id: number, newRestaurant: any) {
    /*if (newRestaurant.image) {
      this.restaurants[index].image = newRestaurant.image;
    }
    this.restaurants[index].name = newRestaurant.name;
    this.restaurants[index].city = newRestaurant.city;
    this.restaurants[index].phone = newRestaurant.phone;
    this.restaurants[index].lat = newRestaurant.latitude;
    this.restaurants[index].lng = newRestaurant.longitude;
*/
    let fd = new FormData();

    fd.append('name', newRestaurant.name);
    fd.append('city', newRestaurant.city);
    fd.append('lat', newRestaurant.lat);
    fd.append('lng', newRestaurant.lng);
    fd.append('phone', newRestaurant.phone);
    fd.append('image', newRestaurant.image);

    this.storage.put(`${url}/${id}`, fd).subscribe(res => {
      this.storage.get(url).subscribe((res: Restaurant[]) => this.setRestaurants(res));
    });

    //this.restaurantsChanged.next(this.restaurants);
  }

  remove(index: number, id: number) {
    this.restaurants.splice(index, 1);

    this.storage.delete(`${url}/${id}`).subscribe();

    this.restaurantsChanged.next(this.restaurants);
  }
}
