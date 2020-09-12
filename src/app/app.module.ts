import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import {AngularFireModule} from '@angular/fire';
import{AngularFireAuthModule}from '@angular/fire/auth';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RegistroComponent } from './Components/registro/registro.component';
import { LoginComponent } from './Components/login/login.component';
import { ResetComponent } from './Components/reset/reset.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from './Components/results/results.component';
import { DetalleComponent } from './Components/detalle/detalle.component';
import { RatingModule } from 'ng-starrating';
import { AgmCoreModule } from '@agm/core';
import{ NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    ResetComponent,
    ResultsComponent,
    DetalleComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    RatingModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDj3p7I4R214Cef6BEOvH9Ptv8kKMz5cD8'
    })
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
