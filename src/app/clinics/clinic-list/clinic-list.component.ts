import { Component, OnInit } from '@angular/core';
import { Clinic } from 'app/clinics/clinics.model';
import { ClinicsService } from 'app/clinics/clinics.service';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit {

  clinics: Clinic[] = [];

  constructor(private clinicsService: ClinicsService) { }

  ngOnInit() {
    this.getClinics();
  }

  getClinics() {
    this.clinicsService.getAll().subscribe((clinics)=> {
      this.clinics = clinics;
    });
  }

  onDelete(id: string) {
    this.clinicsService.delete(id).subscribe((response) => {
      this.getClinics();
    })
  }



}
