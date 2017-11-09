import { Component, OnInit, ViewChild } from '@angular/core';
import { ClinicsService } from 'app/clinics/clinics.service';
import { TherapistsService } from 'app/therapists/therapists.service';
import { PatientsService } from 'app/patients/patients.service';
import { Clinic } from 'app/clinics/clinics.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Therapist } from 'app/therapists/therapist.model';
import { Patient } from 'app/patients/patient.model';

@Component({
  selector: 'app-clinic-edit',
  templateUrl: './clinic-edit.component.html',
  styleUrls: ['./clinic-edit.component.css']
})
export class ClinicEditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  clinic: Clinic;
  availableTherapists =  [];
  linkedTherapists =  [];

  availablePatients =  [];
  linkedPatients =  [];

  constructor(
    private clinicsService: ClinicsService, 
    private patientsService: PatientsService, 
    private therapistsService: TherapistsService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>  {
      this.clinicsService.get(params['id']).subscribe((clinic: Clinic) => {
        console.log(clinic);
        this.clinic = clinic;
        this.form.setValue({
          name: clinic.name,
          address: clinic.address
        });

        this.therapistsService.getAll().subscribe((therapists)=> {
          let linkedTherapists = therapists.filter((t: Therapist) =>  {
            return clinic.therapists.indexOf(t.id) > -1;
          });
          this.availableTherapists = therapists;
          this.linkedTherapists = linkedTherapists;
        });

        this.patientsService.getAll().subscribe((patients)=> {
          let linkedPatients = patients.filter((p: Patient) =>  {
            return clinic.patients.indexOf(p.id) > -1;
          });
          this.availablePatients = patients;
          this.linkedPatients = linkedPatients;
        });

      });    
    });
  }

  onSubmit(form: NgForm) {
    this.clinic.name = form.value.name;
    this.clinic.address = form.value.address;
    this.clinic.therapists = this.linkedTherapists.map((t: Therapist) => {
      return t.id;
    });
    this.clinic.patients = this.linkedPatients.map((p: Patient) => {
      return p.id;
    });
    this.clinicsService.put(this.clinic).subscribe((clinic)=> {
      console.log(clinic);
      this.router.navigate(['/clinics']);
    });
  }

}
