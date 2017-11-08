
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TherapistsComponent } from "app/therapists/therapists.component";
import { PatientsComponent } from "app/patients/patients.component";
import { ClinicsComponent } from "app/clinics/clinics.component";

const appRoutes: Routes = [{
    path: '',
    redirectTo: '/clinics',
    pathMatch: 'full'
}, {
    path: 'clinics',
    component: ClinicsComponent
}, {
    path: 'patients',
    component: PatientsComponent
}, {
    path: 'therapists',
    component: TherapistsComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}