import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { PatientsComponent } from './patients/patients.component';
import { TherapistsComponent } from './therapists/therapists.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { ClinicNewComponent } from './clinics/clinic-new/clinic-new.component';
import { ClinicListComponent } from './clinics/clinic-list/clinic-list.component';
import { TherapistNewComponent } from './therapists/therapist-new/therapist-new.component';
import { TherapistListComponent } from './therapists/therapist-list/therapist-list.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { PatientNewComponent } from './patients/patient-new/patient-new.component';
import { ClinicEditComponent } from './clinics/clinic-edit/clinic-edit.component';
import { FakeHttp } from 'app/fakeHttp.service';
import { ClinicsService } from 'app/clinics/clinics.service';
import { PatientsService } from 'app/patients/patients.service';
import { TherapistsService } from 'app/therapists/therapists.service';

@NgModule({
  declarations: [
    AppComponent,
    ClinicsComponent,
    PatientsComponent,
    TherapistsComponent,
    ClinicNewComponent,
    ClinicListComponent,
    TherapistNewComponent,
    TherapistListComponent,
    PatientListComponent,
    PatientNewComponent,
    ClinicEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [FakeHttp, ClinicsService, PatientsService, TherapistsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
