import { Component, OnInit } from '@angular/core';
import { TherapistsService } from 'app/therapists/therapists.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-therapist-new',
  templateUrl: './therapist-new.component.html',
  styleUrls: ['./therapist-new.component.css']
})
export class TherapistNewComponent implements OnInit {

  
  constructor( private therapistsService: TherapistsService, private router: Router) { }
  
    ngOnInit() {
    }
  
    onSubmit(form: NgForm) {
      this.therapistsService.create(form.value).subscribe((therapist) => {
        this.router.navigate(['/therapists']);
      });
    }

}
