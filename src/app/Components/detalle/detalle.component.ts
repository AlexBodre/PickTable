import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from 'src/app/model/reserva';
import { IRestaurant } from 'src/app/model/restaurant';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  rest: IRestaurant;

  reserveForm = new FormGroup({
    peopleqty: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
  });

  constructor(
    private restaurantService: RestaurantService,
    private rout: ActivatedRoute,
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let id = +this.rout.snapshot.paramMap.get('id');
    this.restaurantService.getRestaurant(id).subscribe((data) => {
      this.rest = data;
    });
  }

  onReserve() {
    console.log('Button clicked');
    try {
      this.authService.user$.subscribe(async (currentUser) => {
        if (currentUser) {
        const { peopleqty, date, hour } = this.reserveForm.value;
        const reserva: Reserva = {
          userId: currentUser.uid,
          name: this.rest.name,
          peopleqty,
          date,
          hour,
        };
        const res = await this.reservaService.addReserve(reserva);
        if (res) {
          this.reserveForm.reset();
          console.log('Reserva guardada');
        }
        }
      });
    } catch (error) {
      console.log('Error al guardar reserva => ', error);
    }
  }
}
