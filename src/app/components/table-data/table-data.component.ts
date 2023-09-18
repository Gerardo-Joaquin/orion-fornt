import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.sass'],
})
export class TableDataComponent {

  @Input() data: any
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter<any>();

  filters: any = {
    id: '',
    creado: new Date(),
    estatus: '',
    clave: '',
    orden: '',
    tipo: '',
    revision: '',
    empresa: '',
  }
  constructor() {

  }
  ngOnInit(): void {
  }

  filterChange() {
    this.onFilterChange.emit(this.filters)
  }

}
