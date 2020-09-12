import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../services/restaurant.service';
import {IRestaurant} from '../../model/restaurant';
import {ICity} from '../../model/city';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private restaurantService: RestaurantService) { }
  restaurants: IRestaurant[] = [];
  filteredRestaurants: IRestaurant[] = [];
  selectedCity = 'Los Angeles';
  cities: ICity[] = [];
  p: number =1;
  ngOnInit(): void {
    this.loadAllCities();
    this.loadRestaurantList('Los Angeles');
  } 
  selectChanged(selectedCity: string): void {
    this.selectedCity = selectedCity;
    this.loadRestaurantList(this.selectedCity);
  }
  loadAllCities(): void {
    this.restaurantService.getAllCities().subscribe({
      next: data => {
        this.cities = data.cities;
        // console.log(data);
      }
    });
  }

  loadRestaurantList(cityName: string): void {
    this.restaurantService.getRestaurants('city', cityName).subscribe({
      next: data => {
        // console.log(data.restaurants);
        this.restaurants = data.restaurants;
        // this.filteredRestaurants = this.restaurants;
      } ,
      error: err => console.log(err)
    });
  }


}
