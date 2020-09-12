import { Component, OnInit, Input } from '@angular/core';
import { IRestaurant } from 'src/app/model/restaurant';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  restaurant: IRestaurant;
  hovered = false;
  totalstar = 4;
  @Input() extRestaurant: IRestaurant;

  constructor() { }

  ngOnChanges(){
    this.restaurant = this.extRestaurant;
  }

  ngOnInit(): void {
  }

}
