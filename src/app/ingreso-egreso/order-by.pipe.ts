import { Pipe, PipeTransform } from '@angular/core';
import {IngresoEgreso} from './ingreso-egreso.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {

    return items.sort( (a,b) => {
      return a.tipo - b.tipo;
    })
  }

}
