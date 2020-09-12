import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRestaurant } from 'src/app/model/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  rest: IRestaurant;

  constructor(private restaurantService: RestaurantService, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    let id = +this.rout.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurant(id).subscribe(data => {
    this.rest = data;
    })
  }

}
