import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';

import Resaurant from '../../../../models/restaurant';
import { RestaurantRatingsService } from '../../../../services/restaurant-ratings.service';
import { RestaurantsService } from '../../../../services/restaurants.service';
import { TokenStorageService } from '../../../../services/token-storage.service';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.scss']
})
export class RestaurantItemComponent implements OnInit {
  @Input() restaurant: Resaurant;
  @Input() index: number;
  @Output() onEdit = new EventEmitter<any>();

  @ViewChild('form') form;

  customer_id: number;

  image: string;
  name: string;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;

  yellowStars: number[] = [];
  darkStars: number[] = [];

  ratingMode: boolean = false;
  rating: number = 1;

  isAdmin: boolean;

  constructor(private restaurantRatingsService: RestaurantRatingsService,
              private restaurantsService: RestaurantsService,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isAdmin = this.token.getUser().role == 1 ? true : false;

    this.restaurantRatingsService.ratingsChanged.subscribe(
      flag => {
        this.yellowStars = [];
        this.darkStars = [];

        this.getRatings();
      }
    );

    if (!this.yellowStars.length)
      this.getRatings();

    this.customer_id = this.token.getUser().id;
  }

  getRatings() {
    let rating: number = 0;
    rating = this.restaurantRatingsService.getRating(this.restaurant.id) ? this.restaurantRatingsService.getRating(this.restaurant.id) : 0;

    let i: number;
    for (i = 0; i < rating; i++) {
      this.yellowStars.push(1);
    }

    for (i = 0; i < (5-rating); i++) {
      this.darkStars.push(1);
    }

    this.rating = this.restaurantRatingsService.getRatingForCustomer(this.customer_id, this.restaurant.id) ? this.restaurantRatingsService.getRatingForCustomer(this.customer_id, this.restaurant.id) : 1;
  }

  onRating() {
    this.restaurantRatingsService.add({
      rest_id: this.restaurant.id,
      customer_id: this.customer_id,
      rating: this.rating
    });

    this.ratingMode = false;
  }

  onEditMode() {
    this.onEdit.emit({
      selectedIndex: this.index,
      selectedId: this.restaurant.id,
      name: this.restaurant.name,
      city: this.restaurant.city,
      phone: this.restaurant.phone,
      latitude: this.restaurant.lat,
      longitude: this.restaurant.lng
    });
  }


  onSubmit() {
    this.restaurantsService.update(this.index, this.restaurant.id, {image: this.image, name: this.name, city: this.city, phone: this.phone, lat: this.latitude, lng: this.longitude});
  }

  onDelete() {
    this.restaurantsService.remove(this.index, this.restaurant.id);
  }
}
