import { AbstractControl, ValidatorFn, Validator, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';
import * as moment from 'moment';

@Directive({
    selector: '[birthDate][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: BirthDateValidator, multi: true }
    ]
})
export class BirthDateValidator implements Validator {
    validator: ValidatorFn;

    constructor() {
        this.validator = validateBirthDateFactory();
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}

function validateBirthDateFactory(): ValidatorFn {
    return (c: AbstractControl) => {
        let isValid = moment(c.value).startOf('day').isBefore(moment(new Date()).startOf('day'));

        if (isValid) {
            return null;
        } else {
            return {
                birthDate: { valid: false }
            };
        }
    }
}