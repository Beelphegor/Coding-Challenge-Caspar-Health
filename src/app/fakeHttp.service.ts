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

    get(path: string, data?: string) {
        const getSubject = new Subject<any>();
        switch (path) {
            case 'clinics':
                this.getClinics(getSubject, data);
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

    put(path: string, data: any) {
        const putSubject = new Subject<any>();
        switch (path) {
            case 'clinics':
                this.updateClinic(putSubject, data);
                break;
            case 'patients':
                this.deletePatients(putSubject, data);
                break;
            case 'therapists':
                this.deleteTherapists(putSubject, data);
                break;
            default:
                break;
        }
        return putSubject;
    }

    //Fake server Implementations
    //CLINICS
    private createClinic(postSubject: Subject<any>, data: Clinic) {
        let clinics = JSON.parse(localStorage['clinics']);
        clinics.push(new Clinic(data.name, data.address, (new Date()).getTime().toString()));
        localStorage.setItem('clinics', JSON.stringify(clinics));
        setTimeout(() => {
            postSubject.next(data);
            postSubject.complete();
        }, 200);
    }

    private getClinics(getSubject: Subject<any>, data?: string) {
        let clinics = JSON.parse(localStorage['clinics']);
        if(data) {
            clinics = clinics.filter((c) => {
                return c.id === data;
            })[0];
            
            const clinics_therapists = (JSON.parse(localStorage['clinics-therapists'])).filter((ct) => {
                return ct.clinic_id === data;
            });
            const clinics_patients = (JSON.parse(localStorage['clinics-patients'])).filter((cp) => {
                return cp.clinic_id === data;
            });

            clinics['therapists'] = clinics_therapists.map((ct)=> {
                return ct.therapist_id;
            });
            clinics['patients'] = clinics_patients.map((cp)=> {
                return cp.patient_id;
            });
            
        }
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

    private updateClinic(putSubject: Subject<any>, data: Clinic) {
        let clinics = JSON.parse(localStorage['clinics']);
        let newClinics = clinics.filter((c) => { return c.id !== data.id; });

        let clinics_therapists = JSON.parse(localStorage['clinics-therapists']);
        let clinics_patients = JSON.parse(localStorage['clinics-patients']);

        let new_clinics_therapists = clinics_therapists.filter((ct) => { return ct.clinic_id !== data.id });
        let new_clinics_patients = clinics_patients.filter((cp) => { return cp.clinic_id !== data.id });

        let clinics_therapists_to_add = data.therapists.map((t) => {
            return {clinic_id: data.id, therapist_id: t};
        });
        let clinics_patients_to_add = data.patients.map((p) => {
            return {clinic_id: data.id, patient_id: p};
        });

        delete data.therapists;
        delete data.patients;

        newClinics.push(data);
        new_clinics_therapists = new_clinics_therapists.concat(clinics_therapists_to_add);
        new_clinics_patients = new_clinics_patients.concat(clinics_patients_to_add);
                
        localStorage.setItem('clinics', JSON.stringify(newClinics));
        localStorage.setItem('clinics-therapists', JSON.stringify(new_clinics_therapists));
        localStorage.setItem('clinics-patients', JSON.stringify(new_clinics_patients));

        setTimeout(() => {
            putSubject.next(data);
            putSubject.complete();
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