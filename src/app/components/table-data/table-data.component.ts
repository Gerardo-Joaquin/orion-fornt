import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.sass'],
})
export class TableDataComponent {

  @Input()data: any

  constructor() {

  }
  ngOnInit(): void {
  }

}
