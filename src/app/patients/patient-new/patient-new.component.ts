import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PatientsService } from 'app/patients/patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-new',
  templateUrl: './patient-new.component.html',
  styleUrls: ['./patient-new.component.css']
})
export class PatientNewComponent implements OnInit {

  constructor( private patientsService: PatientsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.patientsService.create(form.value).subscribe((patient) => {
      console.log(patient);
      this.router.navigate(['/patients']);
    });
  }

}
