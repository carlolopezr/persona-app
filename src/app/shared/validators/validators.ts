import { FormControl, ValidationErrors } from "@angular/forms";
import ChileanRutify from 'chilean-rutify';


export const telValidator = (control: FormControl) => {
  const regexTelefonoChileno = /^9\d{8}$/;

  // Verificar que control.value no sea null ni undefined
  if (control.value != null && control.value !== undefined) {
    // Realizar la validación y otras operaciones
    const value = control.value.trim();
    const valido = regexTelefonoChileno.test(value);

    if (!valido) {
      return { tel: true };
    }
  }

  return null;
};

export const fechaMenorActualValidator = (control: FormControl): { [key: string]: any } | null => {
  const currentDate = new Date();
  const selectedDate = new Date(control.value);

  if (selectedDate > currentDate) {
    return { fechaMenorActual: true };
  }

  return null;
};


export const validarRut = (control: FormControl) : ValidationErrors | null => {

  const value = control.value

  const rutValido = ChileanRutify.validRut(value)

  if (!rutValido) {
    return { rut : true};
  }

  return null
}
