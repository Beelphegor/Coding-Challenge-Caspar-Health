import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { PatientsComponent } from './patients/patients.component';
import { TherapistsComponent } from './therapists/therapists.component';
import { AppRoutingModule } from 'app/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ClinicsComponent,
    PatientsComponent,
    TherapistsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
