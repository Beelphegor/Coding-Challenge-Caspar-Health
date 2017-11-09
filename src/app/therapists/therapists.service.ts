import { FakeHttp } from "app/fakeHttp.service";
import { Injectable } from "@angular/core";
import { Therapist } from "app/therapists/therapist.model";

@Injectable()
export class TherapistsService {

    constructor(private http: FakeHttp) { }

    create(therapist: Therapist) {
        return this.http.post('therapists', therapist);
    }

    getAll() {
        return this.http.get('therapists');
    }

    delete(id: string) {
        return this.http.delete('therapists', id);
    }
    
}