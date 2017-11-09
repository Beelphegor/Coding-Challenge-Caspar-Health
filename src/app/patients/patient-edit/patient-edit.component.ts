import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from 'app/patients/patient.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PatientsService } from 'app/patients/patients.service';
import { Therapist } from 'app/therapists/therapist.model';
import { Clinic } from 'app/clinics/clinics.model';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  patient: Patient;
  linkedClinics: Clinic[] = [];
  linkedTherapists: Therapist[] = [];

  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      this.patientsService.get(params['id']).subscribe((patient: Patient) => {
        this.patient = patient;
        this.linkedClinics = patient.clinics;
        this.linkedTherapists = patient.therapists;
        this.form.setValue({
          firstName: patient.firstName,
          lastName: patient.lastName,
          birthDate: patient.birthDate,
          gender: patient.gender
        });
      });
    });
  }

  onSubmit(form: NgForm) {
    this.patient.firstName = form.value.firstName;
    this.patient.lastName = form.value.lastName;
    this.patient.birthDate = form.value.birthDate;
    this.patient.gender = form.value.gender;
    this.patient.fullName = `${form.value.lastName}, ${form.value.firstName}`

    this.patientsService.put(this.patient).subscribe((patient) => {
      console.log(patient);
      this.router.navigate(['/patients']);
    });
  }

}
