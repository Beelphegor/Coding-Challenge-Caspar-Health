import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    if(!localStorage.getItem('clinics')) {
      localStorage.setItem('clinics', JSON.stringify([]));
      localStorage.setItem('therapists', JSON.stringify([]));
      localStorage.setItem('patients', JSON.stringify([]));
      localStorage.setItem('clinics-patients', JSON.stringify([]));
      localStorage.setItem('clinics-therapists', JSON.stringify([]));
      localStorage.setItem('therapists-patients', JSON.stringify([]));
    }
  }
}
