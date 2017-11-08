export class Patient {
    public firstName: string;
    public lastName: string;
    public birthDate: Date;
    public gender: string;
    public id: string;

    constructor(firstName: string, lastName: string, birthDate: Date, gender: string, id: string) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.birthDate = birthDate,
        this.gender = gender,
        this.id = id
    }
}