import { Subject } from "rxjs/Subject";
import { Clinic } from "app/clinics/clinics.model";
import { Patient } from "app/patients/patient.model";
import { Therapist } from "app/therapists/therapist.model";

export class FakeHttp {
    post(path: string, data: any) {
        const postSubject = new Subject<any>();
        switch (path) {
            case 'clinics':
                this.createClinic(postSubject, data);
                break;
            case 'patients':
                this.createPatient(postSubject, data);
                break;
            case 'therapists':
                this.createTherapist(postSubject, data);
                break;
            default:
                break;
        }
        return postSubject;
    }

    get(path: string) {
        const getSubject = new Subject<any>();
        switch (path) {
            case 'clinics':
                this.getClinics(getSubject);
                break;
            case 'patients':
                this.getPatients(getSubject);
                break;
            case 'therapists':
                this.getTherapists(getSubject);
                break;
            default:
                break;
        }
        return getSubject;
    }

    delete(path: string, data: string) {
        const deleteSubject = new Subject<any>();
        switch (path) {
            case 'clinics':
                this.deleteClinics(deleteSubject, data);
                break;
            case 'patients':
                this.deletePatients(deleteSubject, data);
                break;
            case 'therapists':
                this.deleteTherapists(deleteSubject, data);
                break;
            default:
                break;
        }
        return deleteSubject;
    }

    //Fake server Implementations
    //CLINICS
    private createClinic(postSubject: Subject<any>, data) {
        let clinics = JSON.parse(localStorage['clinics']);
        clinics.push(new Clinic(data.name, data.address, (new Date()).getTime().toString()));
        localStorage.setItem('clinics', JSON.stringify(clinics));
        setTimeout(() => {
            postSubject.next(data);
            postSubject.complete();
        }, 200);
    }

    private getClinics(getSubject: Subject<any>) {
        let clinics = JSON.parse(localStorage['clinics']);
        setTimeout(() => {
            getSubject.next(clinics);
            getSubject.complete();
        }, 200);
    }

    private deleteClinics(deleteSubject: Subject<any>, data: string) {
        let clinics: Clinic[] = JSON.parse(localStorage['clinics']);
        let newClinics = clinics.filter((c) => {
            return c.id !== data;
        });
        localStorage.setItem('clinics', JSON.stringify(newClinics));
        setTimeout(() => {
            deleteSubject.next(data);
            deleteSubject.complete();
        }, 200);
    }

    //PATIENTS    
    private createPatient(postSubject: Subject<any>, data) {
        let patients = JSON.parse(localStorage['patients']);
        patients.push(new Patient(data.firstName, data.lastName, data.birthDate, data.gender, (new Date()).getTime().toString()));
        localStorage.setItem('patients', JSON.stringify(patients));
        setTimeout(() => {
            postSubject.next(data);
            postSubject.complete();
        }, 200);
    }

    private getPatients(getSubject: Subject<any>) {
        let patients = JSON.parse(localStorage['patients']);
        setTimeout(() => {
            getSubject.next(patients);
            getSubject.complete();
        }, 200);
    }

    private deletePatients(deleteSubject: Subject<any>, data: string) {
        let patients: Clinic[] = JSON.parse(localStorage['patients']);
        let newPatients = patients.filter((c) => {
            return c.id !== data;
        });
        localStorage.setItem('patients', JSON.stringify(newPatients));
        setTimeout(() => {
            deleteSubject.next(data);
            deleteSubject.complete();
        }, 200);
    }

     //THERAPISTS    
     private createTherapist(postSubject: Subject<any>, data) {
        let therapists = JSON.parse(localStorage['therapists']);
        therapists.push(new Therapist(data.firstName, data.lastName, data.birthDate, data.gender, (new Date()).getTime().toString()));
        localStorage.setItem('therapists', JSON.stringify(therapists));
        setTimeout(() => {
            postSubject.next(data);
            postSubject.complete();
        }, 200);
    }

    private getTherapists(getSubject: Subject<any>) {
        let therapists = JSON.parse(localStorage['therapists']);
        setTimeout(() => {
            getSubject.next(therapists);
            getSubject.complete();
        }, 200);
    }

    private deleteTherapists(deleteSubject: Subject<any>, data: string) {
        let therapists: Therapist[] = JSON.parse(localStorage['therapists']);
        let newTherapists = therapists.filter((c) => {
            return c.id !== data;
        });
        localStorage.setItem('therapists', JSON.stringify(newTherapists));
        setTimeout(() => {
            deleteSubject.next(data);
            deleteSubject.complete();
        }, 200);
    }
}