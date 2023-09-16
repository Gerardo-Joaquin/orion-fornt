import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeetchService {
  private synth: SpeechSynthesis;
  private isSpeaking: boolean = false; // Variable de estado

  constructor() {
    this.synth = window.speechSynthesis;
  }

  isSpeakingNow(): boolean {
    return this.isSpeaking;
  }

  speak(text: string): void {
    const voices = speechSynthesis.getVoices()
    const vozSabina = voices.find(voz => voz.name === 'Microsoft Sabina Desktop - Spanish (Mexico)');

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9
    utterance.pitch = 1.2
    utterance.volume = 0.8
    utterance.voice = vozSabina!
    utterance.onend = () => {
      this.isSpeaking = false
    }
    this.synth.speak(utterance);
    this.isSpeaking = true
  }
}
