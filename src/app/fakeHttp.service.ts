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
                this.getPatients(getSubject, data);
                break;
            case 'therapists':
                this.getTherapists(getSubject, data);
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
                this.updatePatient(putSubject, data);
                break;
            case 'therapists':
                this.updateTherapist(putSubject, data);
                break;
            default:
                break;
        }
        return putSubject;
    }

    //Fake server Implementations
    //CLINICS
    private createClinic(postSubject: Subject<any>, data: Clinic) {
        let clinics = JSON.parse(localStorage['jj-clinics']);
        clinics.push(new Clinic(data.name, data.address, (new Date()).getTime().toString()));
        localStorage.setItem('jj-clinics', JSON.stringify(clinics));
        setTimeout(() => {
            postSubject.next(data);
            postSubject.complete();
        }, 200);
    }

    private getClinics(getSubject: Subject<any>, data?: string) {
        let clinics = JSON.parse(localStorage['jj-clinics']).sort((a, b)=> { return a.id - b.id});
        if(data) {
            clinics = clinics.filter((c) => {
                return c.id === data;
            })[0];
            
            const clinics_therapists = (JSON.parse(localStorage['jj-clinics-therapists'])).filter((ct) => {
                return ct.clinic_id === data;
            });
            const clinics_patients = (JSON.parse(localStorage['jj-clinics-patients'])).filter((cp) => {
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
        let clinics: Clinic[] = JSON.parse(localStorage['jj-clinics']);
        let newClinics = clinics.filter((c) => {
            return c.id !== data;
        });
        localStorage.setItem('jj-clinics', JSON.stringify(newClinics));
        setTimeout(() => {
            deleteSubject.next(data);
            deleteSubject.complete();
        }, 200);
    }

    private updateClinic(putSubject: Subject<any>, data: Clinic) {
        let clinics = JSON.parse(localStorage['jj-clinics']);
        let newClinics = clinics.filter((c) => { return c.id !== data.id; });

        let clinics_therapists = JSON.parse(localStorage['jj-clinics-therapists']);
        let clinics_patients = JSON.parse(localStorage['jj-clinics-patients']);

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
                
        localStorage.setItem('jj-clinics', JSON.stringify(newClinics));
        localStorage.setItem('jj-clinics-therapists', JSON.stringify(new_clinics_therapists));
        localStorage.setItem('jj-clinics-patients', JSON.stringify(new_clinics_patients));

        setTimeout(() => {
            putSubject.next(data);
            putSubject.complete();
        }, 200);
    }

    //PATIENTS    
    private createPatient(postSubject: Subject<any>, data) {
        let patients = JSON.parse(localStorage['jj-patients']).sort((a, b)=> { return a.id - b.id});
        patients.push(new Patient(data.firstName, data.lastName, data.birthDate, data.gender, (new Date()).getTime().toString()));
        localStorage.setItem('jj-patients', JSON.stringify(patients));
        setTimeout(() => {
            postSubject.next(data);
            postSubject.complete();
        }, 200);
    }

    private getPatients(getSubject: Subject<any>, data?: string) {
        let patients = JSON.parse(localStorage['jj-patients']).sort((a, b)=> { return a.id - b.id});
        if(data) {
            patients = patients.filter((c) => {
                return c.id === data;
            })[0];
            
            const therapists_patients = (JSON.parse(localStorage['jj-therapists-patients'])).filter((tp) => {
                return tp.patient_id === data;
            });
            const clinics_patients = (JSON.parse(localStorage['jj-clinics-patients'])).filter((cp) => {
                return cp.patient_id === data;
            });
            let allTherapists = JSON.parse(localStorage['jj-therapists']);
            let allClinics = JSON.parse(localStorage['jj-clinics']);

            patients['therapists'] = allTherapists.filter((t: Therapist) => {
                return therapists_patients.map((tp) => {
                    return tp.therapist_id;
                }).indexOf(t.id) > -1;
            });
            patients['clinics'] = allClinics.filter((t: Clinic) => {
                return clinics_patients.map((cp) => {
                    return cp.clinic_id;
                }).indexOf(t.id) > -1;
            });
        }
        setTimeout(() => {
            getSubject.next(patients);
            getSubject.complete();
        }, 200);
    }

    private deletePatients(deleteSubject: Subject<any>, data: string) {
        let patients: Patient[] = JSON.parse(localStorage['jj-patients']);
        let newPatients = patients.filter((c) => {
            return c.id !== data;
        });
        localStorage.setItem('jj-patients', JSON.stringify(newPatients));
        setTimeout(() => {
            deleteSubject.next(data);
            deleteSubject.complete();
        }, 200);
    }

    private updatePatient(putSubject: Subject<any>, data: Patient) {
        let patients: Patient[] = JSON.parse(localStorage['jj-patients']);
        let newPatients = patients.filter((c) => {
            return c.id !== data.id;
        });
        newPatients.push(data);
        localStorage.setItem('jj-patients', JSON.stringify(newPatients));
        setTimeout(() => {
            putSubject.next(data);
            putSubject.complete();
        }, 200);
    }


     //THERAPISTS    
     private createTherapist(postSubject: Subject<any>, data) {
        let therapists = JSON.parse(localStorage['jj-therapists']);
        therapists.push(new Therapist(data.firstName, data.lastName, data.birthDate, data.gender, (new Date()).getTime().toString()));
        localStorage.setItem('jj-therapists', JSON.stringify(therapists));
        setTimeout(() => {
            postSubject.next(data);
            postSubject.complete();
        }, 200);
    }

    private getTherapists(getSubject: Subject<any>, data?: string) {

        let therapists = JSON.parse(localStorage['jj-therapists']).sort((a, b)=> { return a.id - b.id});
        if(data) {
            therapists = therapists.filter((t) => {
                return t.id === data;
            })[0];

            const therapists_patients = (JSON.parse(localStorage['jj-therapists-patients'])).filter((tp) => {
                return tp.therapist_id === data;
            });

            therapists['patients'] = therapists_patients.map((cp)=> {
                return cp.patient_id;
            });
        }

        setTimeout(() => {
            getSubject.next(therapists);
            getSubject.complete();
        }, 200);
    }

    private deleteTherapists(deleteSubject: Subject<any>, data: string) {
        let therapists: Therapist[] = JSON.parse(localStorage['jj-therapists']);
        let newTherapists = therapists.filter((c) => {
            return c.id !== data;
        });
        localStorage.setItem('jj-therapists', JSON.stringify(newTherapists));
        setTimeout(() => {
            deleteSubject.next(data);
            deleteSubject.complete();
        }, 200);
    }

    private updateTherapist(putSubject: Subject<any>, data: Therapist) {
        let therapists = JSON.parse(localStorage['jj-therapists']);
        let newTherapists = therapists.filter((c) => { return c.id !== data.id; });

        let therapists_patients = JSON.parse(localStorage['jj-therapists-patients']);

        let new_therapists_patients = therapists_patients.filter((tp) => { return tp.therapist_id !== data.id });

        let therapists_patients_to_add = data.patients.map((p) => {
            return {therapist_id: data.id, patient_id: p};
        });

        delete data.patients;

        newTherapists.push(data);
        new_therapists_patients = new_therapists_patients.concat(therapists_patients_to_add);
                
        localStorage.setItem('jj-therapists', JSON.stringify(newTherapists));
        localStorage.setItem('jj-therapists-patients', JSON.stringify(new_therapists_patients));

        setTimeout(() => {
            putSubject.next(data);
            putSubject.complete();
        }, 200);
    }
}