import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    if(!localStorage.getItem('jj-clinics')) {
      localStorage.setItem('jj-clinics', JSON.stringify([]));
      localStorage.setItem('jj-therapists', JSON.stringify([]));
      localStorage.setItem('jj-patients', JSON.stringify([]));
      localStorage.setItem('jj-clinics-patients', JSON.stringify([]));
      localStorage.setItem('jj-clinics-therapists', JSON.stringify([]));
      localStorage.setItem('jj-therapists-patients', JSON.stringify([]));
    }
  }
}
