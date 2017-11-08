import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClinicsService } from 'app/clinics/clinics.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinic-new',
  templateUrl: './clinic-new.component.html',
  styleUrls: ['./clinic-new.component.css']
})
export class ClinicNewComponent implements OnInit {

  constructor(private clinicsService: ClinicsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.clinicsService.create(form.value).subscribe((response: any) => {
      console.log("asdfasdf");
      this.router.navigate(["/clinics"]);
    });
  }

}
