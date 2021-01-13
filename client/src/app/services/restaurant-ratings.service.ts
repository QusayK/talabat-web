import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import RestaurantRating from '../models/restaurantRating';
import { DataStorageService } from './data-storage.service';

const url: string = 'http://localhost:5000/api/rating';

@Injectable({
  providedIn: 'root'
})
export class RestaurantRatingsService {
  private ratings: RestaurantRating[] = [];

  ratingsChanged = new Subject<RestaurantRating[]>();

  constructor(private storage: DataStorageService) { }

  setRatings(ratings: RestaurantRating[]) {
    this.ratings = ratings;

    this.ratingsChanged.next(this.ratings);
  }

  getAll() {
    return this.ratings;
  }

  getRating(rest_id) {
    let ratings: RestaurantRating[] = [];
    let ratingValue: number = 0;

    this.ratings.map(rating => {
        if (rating.rest_id == rest_id)

          ratings.push(rating)
    });

    ratings.forEach(rating => {
      ratingValue += rating.rating;
    });

    return Math.floor(ratingValue/ratings.length);
  }

  getRatingForCustomer(customer_id: number, rest_id: number) {
    let customerRating: number;

    this.ratings.map(
      rating => {
        if (rating.customer_id == customer_id && rating.rest_id == rest_id)
          customerRating = rating.rating;
      }
    );

    return customerRating;
  }

  add(rating: any) {
    //let customers_ids = this.ratings.map(rating => rating.customer_id);
    //let rests_ids = this.ratings.map(rating => rating.rest_id);
/*
    if (customers_ids.includes(rating.customer_id) && rests_ids.includes(rating.rest_id)) {

      let index = rests_ids.indexOf(rating.rest_id);
      this.ratings[index].rating = rating.rating;

      this.update(this.ratings[index].id, this.ratings[index]);
    } else {
      this.storage.post(url, rating).subscribe(flag => {
        this.storage.get(url).subscribe((ratings: RestaurantRating[]) => this.setRatings(ratings));
      });
    }*/

    let customerRatings = this.ratings.filter(_rating => _rating.customer_id == rating.customer_id);
    let rests_ids = customerRatings.map(rating => rating.rest_id);

    if (rests_ids.includes(rating.rest_id)) {
      let _index = rests_ids.indexOf(rating.rest_id);
      let customerRating = customerRatings[_index];

      let index = this.ratings.indexOf(customerRating);
      this.ratings[index].rating = rating.rating;

      this.update(this.ratings[index].id, this.ratings[index]);
    } else {
     this.storage.post(url, rating).subscribe(flag => {
        this.storage.get(url).subscribe((ratings: RestaurantRating[]) => this.setRatings(ratings));
      });
    }
  }

  update(id: number, newRating: any) {
    this.storage.put(`${url}/${id}`, newRating).subscribe();

    this.ratingsChanged.next(this.ratings);
  }

  remove(index: number, id: number) {
    this.ratings.splice(index, 1);
    this.storage.delete(`${url}/${id}`).subscribe();

    this.ratingsChanged.next(this.ratings);
  }
}
