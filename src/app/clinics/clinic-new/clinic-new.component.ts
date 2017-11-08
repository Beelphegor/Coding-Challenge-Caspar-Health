import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clinic-new',
  templateUrl: './clinic-new.component.html',
  styleUrls: ['./clinic-new.component.css']
})
export class ClinicNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
