import { FakeHttp } from "app/fakeHttp.service";
import { Clinic } from "app/clinics/clinics.model";
import { Injectable } from "@angular/core";

@Injectable()
export class ClinicsService {

    constructor(private http: FakeHttp) { }

    create(clinic: Clinic) {
        return this.http.post('clinics', clinic);
    }

    getAll() {
        return this.http.get('clinics');
    }

    delete(id: string) {
        return this.http.delete('clinics', id);
    }

    get(id: string) {
        return this.http.get('clinics', id);
    }

    put(clinic: Clinic) {
        return this.http.put('clinics', clinic);
    }
    
}