import { FakeHttp } from "app/fakeHttp.service";
import { Clinic } from "app/clinics/clinics.model";
import { Injectable } from "@angular/core";

@Injectable()
export class ClinicsService {

    constructor(private http: FakeHttp) { }

    create(clinic: Clinic) {
        return this.http.post('clinic', clinic);
    }

    getAll() {
        return this.http.get('clinics');
    }
    
}