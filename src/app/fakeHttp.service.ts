import { Subject } from "rxjs/Subject";
import { Clinic } from "app/clinics/clinics.model";

export class FakeHttp {
    post(path: string, data: any) {
        const postSubject = new Subject<any>();
        switch (path) {
            case 'clinic':
                this.createClinic(postSubject, data);
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
        }
        return getSubject;
    }

    //Fake server Implementations
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
}