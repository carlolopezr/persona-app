import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexoTransform'
})
export class SexoTransformPipe implements PipeTransform {
  transform(value: number): string {
    return value === 0 ? 'M' : 'F';
  }
}
