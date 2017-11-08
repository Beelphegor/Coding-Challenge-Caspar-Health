export class Clinic {
    public name: string
    public address: string
    public patients: string[]
    public therapists: string[]
    public id: string;

    constructor(name: string, address: string, id: string) {
        this.name = name,
        this.address = address,
        this.id = id
    }
}