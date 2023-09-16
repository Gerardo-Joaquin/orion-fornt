import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filtro: string): any[] {
    if (!filtro) {
      return items;
    }
    filtro = filtro.toLowerCase();
    return items.filter(item => {
      // Recorre todos los atributos del objeto y verifica si alguno contiene la cadena de búsqueda
      for (let key in item) {
        if (item[key] && item[key].toString().toLowerCase().includes(filtro)) {
          return true;
        }
      }
      return false;
    });
  }

}
