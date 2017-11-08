
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TherapistsComponent } from "app/therapists/therapists.component";
import { PatientsComponent } from "app/patients/patients.component";
import { ClinicsComponent } from "app/clinics/clinics.component";
import { ClinicListComponent } from "app/clinics/clinic-list/clinic-list.component";
import { ClinicNewComponent } from "app/clinics/clinic-new/clinic-new.component";
import { PatientListComponent } from "app/patients/patient-list/patient-list.component";
import { TherapistListComponent } from "app/therapists/therapist-list/therapist-list.component";
import { TherapistNewComponent } from "app/therapists/therapist-new/therapist-new.component";
import { PatientNewComponent } from "app/patients/patient-new/patient-new.component";

const appRoutes: Routes = [{
    path: '',
    redirectTo: '/clinics',
    pathMatch: 'full'
}, {
    path: 'clinics',
    component: ClinicsComponent,
    children: [
        { path: '', component: ClinicListComponent },
        { path: 'new', component: ClinicNewComponent }
    ]
}, {
    path: 'patients',
    component: PatientsComponent,
    children: [
        { path: '', component: PatientListComponent },
        { path: 'new', component: PatientNewComponent }
    ]
}, {
    path: 'therapists',
    component: TherapistsComponent,
    children: [
        { path: '', component: TherapistListComponent },
        { path: 'new', component: TherapistNewComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}