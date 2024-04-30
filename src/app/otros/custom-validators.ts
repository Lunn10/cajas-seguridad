import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


export class CustomValidators extends Validators {
    static debeSerIgual(nombrePrimerControl: string, nombreSegundoControl: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
          const primerControl = group.get(nombrePrimerControl);
          const segundoControl = group.get(nombreSegundoControl);
          console.log(primerControl?.value === segundoControl?.value ? null : { debeSerIgual: true });
          return primerControl?.value === segundoControl?.value ? null : { debeSerIgual: true };
        };
      }
}