import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/User';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user$: Observable<User> = this.authSvc.user$;

  constructor(public authSvc:AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    }

  catch(error){
   console.log(error);
  }
    
  }

}
