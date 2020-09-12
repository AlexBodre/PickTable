import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  providers:[AuthService],
})
export class ResetComponent implements OnInit {

    userEmail = new FormControl('');  
  constructor(private authSvc:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

   async OnReset(){

    try{
      const email =  this.userEmail.value;
    this.authSvc.resetPassword(email);
    window.alert('Email sent, check your inbox')
    console.log(email)
    //redirect to login
    this.router.navigate(['/login']);
    }
    catch(error){console.log(error)}

    
  }

}
