import { AbstractControl } from "@angular/forms";

export function passwordConfirmValidator(control: AbstractControl) {
    if (control && (control !== null || control !== undefined)){
        const cnfpassValue = control.value;
        const passControl = control.root.get('password');

        if (passControl) {
            const passValue = passControl.value;
            if (passValue !== cnfpassValue || passValue === '') {
                return {
                    isError : true
                };
            }
        }
    }

    return null;
}