import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Reserva } from 'src/app/model/reserva';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.scss']
})
export class ReservacionesComponent implements OnInit {
  reservaList: Reserva[] =[];
  constructor(private rout: ActivatedRoute,
    private reservaService: ReservaService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAllReseva();
  }

 loadAllReseva(){
   this.authService.user$.subscribe(currentUser => {
     if(currentUser) {
      this.reservaService.getAllReserveByUserNew(currentUser.uid).subscribe(data => {
        this.reservaList = data;
        console.log(this.reservaList);
      })
     }
   })

  //  this.reservaService.getAllReserveByUserNew(id).subscribe(data =>{
  //    this.reservaList = data.sort(this.reservaService);
  //  })
  
 }

}
