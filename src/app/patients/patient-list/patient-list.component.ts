import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'app/patients/patients.service';
import { Patient } from 'app/patients/patient.model';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];

  constructor(private patientsService: PatientsService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.patientsService.getAll().subscribe((patients)=> {
      this.patients = patients;
    });
  }

  onDelete(id: string) {
    this.patientsService.delete(id).subscribe((response) => {
      this.getPatients();
    })
  }

}
