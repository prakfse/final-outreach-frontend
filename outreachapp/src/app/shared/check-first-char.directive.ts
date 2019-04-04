import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appControlFirstChar]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ControlFirstCharDirective,
        multi: true
    }]
})

export class ControlFirstCharDirective implements Validator {
    @Input() appControlFirstChar: string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        const controlToCompare = control.parent.get(this.appControlFirstChar);
        if (!isNaN(controlToCompare.value[0])) {
            return { 'notAChar': true };
        }
        return null;
    }
}
