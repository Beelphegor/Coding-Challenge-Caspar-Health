import { FakeHttp } from "app/fakeHttp.service";
import { Injectable } from "@angular/core";
import { Patient } from "app/patients/patient.model";

@Injectable()
export class PatientsService {

    constructor(private http: FakeHttp) { }

    create(patient: Patient) {
        return this.http.post('patients', patient);
    }

    getAll() {
        return this.http.get('patients');
    }

    delete(id: string) {
        return this.http.delete('patients', id);
    }
    
}