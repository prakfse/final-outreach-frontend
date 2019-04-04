import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appCompareControlValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: CompareControlValidatorDirective,
        multi: true
    }]
})

export class CompareControlValidatorDirective implements Validator {
    @Input() appCompareControlValidator: string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        const controlToCompare = control.parent.get(this.appCompareControlValidator);
        if (controlToCompare && controlToCompare.value !== control.value) {
            return { 'notEqual': true };
        }
        return null;
    }
}
