import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutFormat'
})
export class RutPipe implements PipeTransform {
  transform(value: string): string {

    if (value && value.length >= 2) {
      const rut = value.slice(0, -1);
      const digitoVerificador = value.slice(-1);

      return `${rut}-${digitoVerificador}`;
    }
    return value;
  }
}
