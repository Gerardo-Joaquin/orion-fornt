import { Component, EventEmitter, Output } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition.service';
import { data } from './data'
import { TextToSpeetchService } from 'src/app/services/text-to-speetch.service';
@Component({
  selector: 'app-spetch-to-text',
  templateUrl: './spetch-to-text.component.html',
  styleUrls: ['./spetch-to-text.component.scss']
})
export class SpetchToTextComponent {
  itemsPerPage = 50;
  currentPage = 1
  startIndex: any
  endIndex: any
  currentData: any
  data: any
  term!: string
  filters: any
  constructor(
    public voiceRecService: VoiceRecognitionService,
    public textToSpeech: TextToSpeetchService
  ) {
    this.voiceRecService.init();
  }
  ngOnInit(): void {
    this.textToSpeech.speak('Hola, soy Orión, te escucho, para comenzar di, hey orión')


    setTimeout(() => {
      this.voiceRecService.start();
    }, 5000);
    this.data = data
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.currentData = data.slice(this.startIndex, this.endIndex);
  }
  pageChanged(page: number): void {
    this.currentPage = page
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.currentData = data.slice(this.startIndex, this.endIndex);
  }
  filterChange(filters: any): void {
    this.filters = filters
    console.log(filters);
    this.currentPage = 1; // Reinicia la página a la primera página cuando se aplica un filtro.
    this.filterAndPaginateData();
  }

  private filterAndPaginateData(): void {
    this.currentData = this.data.filter((item: any) => {
      // Aplica todos los filtros aquí
      const idFilter = item.id.toLowerCase().includes(this.filters.id.toLowerCase());
      const tipoF = item.tipo_auditoria.toLowerCase().includes(this.filters.tipo.toLowerCase());
      const orden = item.numero_orden.toLowerCase().includes(this.filters.orden.toLowerCase());
      const estatusF = item.estatus_documento.toLowerCase().includes(this.filters.estatus.toLowerCase());
      const claveF = item.clave_auditoria.toString().toLowerCase().includes(this.filters.clave.toLowerCase());
      const revisionF = item.tipo_revision.toLowerCase().includes(this.filters.revision.toLowerCase());
      const empresaF = item.nombre.toLowerCase().includes(this.filters.empresa.toLowerCase());
      // Agrega más filtros para otras columnas aquí
      // Filtrar por fecha si la fecha seleccionada no es nula
      const fechaSeleccionada = new Date(this.filters.creado);
      fechaSeleccionada.setDate(fechaSeleccionada.getDate() + 1)
      const fechaItem = new Date(item.creado);
      fechaItem.setHours(0,0,0,0)
      fechaSeleccionada.setHours(0,0,0,0)
      // Verificar si la fecha seleccionada coincide con la fecha del elemento
      const fechaFilter = fechaSeleccionada ? fechaItem.getTime() === fechaSeleccionada.getTime() : true;
      // Retorna verdadero solo si todos los filtros son verdaderos
      return idFilter && orden && fechaFilter && tipoF && estatusF && claveF && revisionF && empresaF /* && otrosFiltros */;
    });



    // Actualiza la paginación según los datos filtrados y el nuevo valor de `itemsPerPage`.
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
    this.currentData = this.currentData.slice(this.startIndex, this.endIndex);
  }



  startService() {
    // this.voiceRecService.start();
    this.voiceRecService.startListening();
  }

  stopService() {
    this.voiceRecService.stop();
  }

}
