import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, delay, filter } from 'rxjs';
import { TextToSpeetchService } from './text-to-speetch.service';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition = new webkitSpeechRecognition();
  isStopSpeechRecording: boolean = false;
  _isMarkListening: boolean = false;
  private _isProcessingRequest: boolean = false;
  private isProcessingRequestSubject = new Subject<boolean>();
  isHome: boolean = false;
  public text: string = '';
  public question: string = ''
  tempWords: string = '';
  private isListening: boolean = false;
  firstContact = false
  public response = ''
  constructor(
    private router: Router,
    private http: HttpClient,
    private textToSpeech: TextToSpeetchService
  ) {
    this.router.events.pipe(
      delay(10),
      filter((e) => e instanceof NavigationEnd)
    )
      .subscribe((event: any) => {
        this.isHome = event.url === '/';
      })
  }

  ngOnInit(): void {
  }

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-MX';
    // this.recognition.lang = 'en-US';
    // this.recognition.lang = 'de-DE';
    // this.recognition.lang = 'fr-FR';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      this.tempWords = transcript;
      // console.log("Transcript:", transcript);
    })
  }

  start() {
    this.isStopSpeechRecording = false;
    this.startRecognition();
    console.log("Speech Recognition Started");
    this.recognition.addEventListener('end', () => {
      if (this.isStopSpeechRecording) {
        this.stopRecognition();
      } else {

        this.wordConcat();
        this.startRecognition();
      }
    });
  }

  stop() {
    this.isStopSpeechRecording = true;
    console.log("End speech recognition");
    this.wordConcat();
  }

  startRecognition() {
    this.recognition.start();
  }

  stopRecognition() {
    this.recognition.stop();
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
    if (
      this.text.toLowerCase().includes('orion') ||
      this.text.toLowerCase().includes('orio') ||
      this.text.toLowerCase().includes('guion') ||
      this.text.toLocaleLowerCase().includes('orión')
    ) {
      if (!this._isProcessingRequest) {
        this.firstContact ? this.textToSpeech.speak('¿Si?, te escucho')
          : this.textToSpeech.speak('Hola, ¿en qué puedo ayudarte?')
        this.firstContact = true;
        this.response = ''
        this.question = ''
        this.reset();
        this.startListening();
      }
    }
    else {
      if (this.isListening && !this._isProcessingRequest) {
        const expresionRegular = /([¿?].+[¿?])/;
        if (expresionRegular.test(this.text)) {
          console.log('entro');
          const result = expresionRegular.exec(this.text)
          if (result) {
            const question = result[0].replace('.', ' ')
            this.question = question
            console.log(question);
            const body = {
              question
            }
            this._isProcessingRequest = true; // Marcar que se está procesando una solicitud
            this.isProcessingRequestSubject.next(this._isProcessingRequest); // Emite el cambio
            this.http.post('http://localhost:8000/data', body).subscribe((res: any) => {
              this.textToSpeech.speak(res.toString())
              this.response = res.toString()
              this._isProcessingRequest = false; // Marcar que se ha completado la solicitud
              this.isProcessingRequestSubject.next(this._isProcessingRequest); // Emite el cambio
              this.isListening = false
              this.stopRecognition()
              this.start();
            })
          }
        }
      }
    }

  }
  get isProcessingRequest$() {
    return this.isProcessingRequestSubject.asObservable();
  }
  startListening() {
    if (!this._isProcessingRequest) {
      console.log("estoy escuchando");
      this.text = '';
      this.isListening = true;
      this._isMarkListening = !this._isMarkListening;
      console.log(this._isMarkListening);
    }
  }

  reset() {
    this.stopRecognition();
    this._isMarkListening = false;
    this.text = '';

  }
}
