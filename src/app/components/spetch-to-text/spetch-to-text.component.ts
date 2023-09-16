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
  filterChange(term: string): void {
    console.log(term);
    this.term = term;
    this.currentPage = 1; // Reinicia la página a la primera página cuando se aplica un filtro.
    this.filterAndPaginateData();
  }

  private filterAndPaginateData(): void {
    const terminoLowerCase = this.term.toLowerCase();
    this.currentData = this.data.filter((item: any) =>
      item.id.toLowerCase().includes(terminoLowerCase) ||
      item.creado.toLowerCase().includes(terminoLowerCase) ||
      item.estatus_documento.toLowerCase().includes(terminoLowerCase) ||
      item.clave_auditoria.toString().toLowerCase().includes(terminoLowerCase) ||
      item.numero_orden.toLowerCase().includes(terminoLowerCase) ||
      item.tipo_auditoria.toLowerCase().includes(terminoLowerCase) ||
      item.tipo_revision.toLowerCase().includes(terminoLowerCase) ||
      item.nombre.toLowerCase().includes(terminoLowerCase) ||
      item.c_idc_rfceeog1.toString().toLowerCase().includes(terminoLowerCase)
    );



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
