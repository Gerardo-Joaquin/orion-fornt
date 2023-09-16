import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() items: any[] = []; // Arreglo de elementos que se pasa como entrada
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onFilterChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() currentPage!: number; // La página actual
  @Input() itemsPerPage!: number; // La cantidad de elementos por página

  // Evento que se dispara al cambiar de página
  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.onPageChange.emit(this.currentPage);
  }

  // Función para obtener los elementos de la página actual
  getItemsForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.items.slice(startIndex, endIndex);
  }

  // Función para obtener el número total de páginas
  totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }
  onInputChange(event: any): void {
    const inputValue = event.target.value;
    this.onFilterChange.emit(inputValue)
  }
  getPages(): number[] {
    const totalPages = this.totalPages();
    const pagesToShow = 10; // Puedes ajustar el número de páginas mostradas según tus necesidades
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    let startPage = Math.max(this.currentPage - halfPagesToShow, 1);
    let endPage = Math.min(startPage + pagesToShow - 1, totalPages);

    // Ajusta el inicio si estás cerca del final de la lista
    if (totalPages - endPage < halfPagesToShow) {
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
