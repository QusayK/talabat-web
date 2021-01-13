import { Component, OnInit } from '@angular/core';

import { RestaurantsService } from '../../services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  image: string;

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
  }
}
