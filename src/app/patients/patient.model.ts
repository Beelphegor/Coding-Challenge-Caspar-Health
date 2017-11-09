import { Clinic } from "app/clinics/clinics.model";
import { Therapist } from "app/therapists/therapist.model";

export class Patient {
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public birthDate: Date;
    public gender: string;
    public therapists: Therapist[];
    public clinics: Clinic[];
    public id: string;

    constructor(firstName: string, lastName: string, birthDate: Date, gender: string, id: string) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.fullName = `${lastName}, ${firstName}`,
        this.birthDate = birthDate,
        this.gender = gender,
        this.id = id
    }
}