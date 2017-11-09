export class Therapist {
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public birthDate: Date;
    public gender: string;
    public patients: string[];
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