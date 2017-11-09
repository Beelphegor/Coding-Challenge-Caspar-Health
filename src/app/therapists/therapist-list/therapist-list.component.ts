import { Component, OnInit } from '@angular/core';
import { Therapist } from 'app/therapists/therapist.model';
import { TherapistsService } from 'app/therapists/therapists.service';

@Component({
  selector: 'app-therapist-list',
  templateUrl: './therapist-list.component.html',
  styleUrls: ['./therapist-list.component.css']
})
export class TherapistListComponent implements OnInit {
  therapists: Therapist[] = [];

  constructor(private therapistsService: TherapistsService) { }

  ngOnInit() {
    this.gettherapists();
  }

  gettherapists() {
    this.therapistsService.getAll().subscribe((therapists) => {
      this.therapists = therapists;
    });
  }

  onDelete(id: string) {
    this.therapistsService.delete(id).subscribe((response) => {
      this.gettherapists();
    })
  }
}
