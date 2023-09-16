import { Component } from '@angular/core';
import { VoiceRecognitionService } from './services/voice-recognition.service';
import { interval } from 'rxjs';
import { TextToSpeetchService } from './services/text-to-speetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orion-front';

  mensajes!: Array<any>
  mensajesProcesamiento!: Array<any>
  mensajesEspera!: Array<any>
  public message = ''
  process = false
  constructor(
    public voiceRecService: VoiceRecognitionService,
    public textToSpeech: TextToSpeetchService
  ) {
  }
  ngOnInit(): void {
    this.mensajes = [
      "Entendido, respondiendo a tu pregunta",
      "Comenzaré a analizar la petición",
      "Estoy buscando la información que necesitas sobre la pregunta",
      "Estoy en proceso de buscar respuestas a la pregunta: en la base de datos",
      "Estoy trabajando en tu solicitud a la pregunta. Solo tomará un momento.",
      "Estoy en busca de la información que necesitas sobre la pregunta",
      "Estoy accediendo a la base de datos para encontrar las respuestas a la pregunta",
      "Gracias por tu interés. Estoy buscando en la base de datos para responder a"
    ];
    this.mensajesProcesamiento = [
      "Estoy trabajando en tu solicitud",
      "Estoy procesando tu solicitud",
      "Estoy ocupado procesando tu petición",
      "Sigo en proceso de atender tu solicitud",
      "Tu solicitud está siendo procesada",
      "Estoy en ello",
      "Tu petición está en proceso",
      "Estoy ocupado procesando tu petición"
    ];
    this.mensajesEspera = [
      "Por favor, dame un momento.",
      "Por favor, aguarda un momento.",
      "Te pido un poco de paciencia.",
      "En breve tendrás una respuesta.",
      "Estoy en proceso de atenderla. Un momento, por favor.",
      "Estoy procesando la información. Un momento, por favor.",
      "Por favor, espera mientras completamos la acción.",
      "Por favor, ten un poco de paciencia mientras termino."
    ];
    this.voiceRecService.isProcessingRequest$.subscribe(data => {
      this.process = data;
      if (this.process) {
        this.chargeMomments()
      }
    })
  }

  chargeMomments() {
    const momment = this.mensajes[Math.floor(Math.random() * 7)]
    this.message = momment
    this.textToSpeech.speak(this.message)
    const $timer = interval(1000)
    let seconds = 0; // Llevar un registro del tiempo transcurrido
    $timer.subscribe((second) => {
      if (this.process) {
        seconds++;
        if (second === 15) {
          const mensajeProcesamiento = this.mensajesProcesamiento[Math.floor(Math.random() * this.mensajesProcesamiento.length)];
          this.message = mensajeProcesamiento;
          this.textToSpeech.speak(this.message);
        } else if (seconds > 45 && seconds % 20 === 0) {
          // Cambiar el mensaje cada 20 segundos después de los 45 segundos iniciales
          const listaMensajes = seconds % 40 === 0 ? this.mensajesEspera : this.mensajesProcesamiento;
          const mensajeAleatorio = listaMensajes[Math.floor(Math.random() * listaMensajes.length)];
          this.message = mensajeAleatorio;
          this.textToSpeech.speak(this.message);
        }
      }
    });
  }
}
