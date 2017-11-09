import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Therapist } from 'app/therapists/therapist.model';
import { PatientsService } from 'app/patients/patients.service';
import { TherapistsService } from 'app/therapists/therapists.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Patient } from 'app/patients/patient.model';

@Component({
  selector: 'app-therapist-edit',
  templateUrl: './therapist-edit.component.html',
  styleUrls: ['./therapist-edit.component.css']
})
export class TherapistEditComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  therapist: Therapist;
  availablePatients =  [];
  linkedPatients =  [];

  constructor(
    private patientsService: PatientsService, 
    private therapistsService: TherapistsService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>  {
      this.therapistsService.get(params['id']).subscribe((therapist: Therapist) => {//fix service
        console.log(therapist);
        this.therapist = therapist;
        this.form.setValue({
          firstName: therapist.firstName,
          lastName: therapist.lastName,
          birthDate: therapist.birthDate,
          gender: therapist.gender
        });

        this.patientsService.getAll().subscribe((patients)=> {
          let linkedPatients = patients.filter((p: Patient) =>  {
            return therapist.patients.indexOf(p.id) > -1;
          });
          this.availablePatients = patients;
          this.linkedPatients = linkedPatients;
        });

      });    
    });
  }

  onSubmit(form: NgForm) {
    this.therapist.firstName = form.value.firstName;
    this.therapist.lastName = form.value.lastName;
    this.therapist.birthDate = form.value.birthDate;
    this.therapist.gender = form.value.gender;
    this.therapist.fullName = `${form.value.lastName}, ${form.value.firstName}`
    this.therapist.patients = this.linkedPatients.map((p: Patient) => {
      return p.id;
    });

    this.therapistsService.put(this.therapist).subscribe((therapist)=> {
      console.log(therapist);
      this.router.navigate(['/therapists']);
    })
    
  }

}
