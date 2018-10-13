import { Component, Element, Prop } from '@stencil/core';
declare const responsiveVoice;

@Component({
  tag: 'migrant-text-to-speech',
  styleUrl: 'migrant-text-to-speech.css',
  shadow: true
})
export class MigrantTextToSpeech {
  @Element()
  textToSpeechEl: HTMLElement;

  @Prop()
  voice = 'UK English Male';

  speak() {
    responsiveVoice.speak(this.textToSpeechEl.textContent, this.voice);
  }

  render() {
    return (
      <div class="text-wrapper">
        <slot />
        <ion-button shape="round" onClick={() => this.speak()}>
          <ion-icon name="volume-high" />
        </ion-button>
      </div>
    );
  }
}
