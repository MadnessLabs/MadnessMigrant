import { Color } from '@ionic/core';
import { Component, Element, Prop } from '@stencil/core';
declare const responsiveVoice;

@Component({
  tag: 'migrant-text-to-speech',
  styleUrl: 'migrant-text-to-speech.css'
})
export class MigrantTextToSpeech {
  @Element()
  textToSpeechEl: HTMLElement;

  @Prop()
  voice = 'US English Male';
  @Prop()
  color: Color = 'secondary';
  @Prop()
  message: string;

  speak() {
    responsiveVoice.speak(
      this.message ? this.message : this.textToSpeechEl.textContent,
      this.voice
    );
  }

  render() {
    return (
      <div class="text-wrapper">
        <slot />
        <ion-button
          color={this.color}
          shape="round"
          onClick={() => this.speak()}
        >
          <ion-icon name="volume-high" />
        </ion-button>
      </div>
    );
  }
}
