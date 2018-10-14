import { Component, Prop } from '@stencil/core';
import { LanguageService } from '../../services/language';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {
  @Prop()
  language: LanguageService;

  render() {
    return [
      <app-header language={this.language.currentLanguage} />,
      <ion-content>
        <p>Hello AppHome!</p>
      </ion-content>
    ];
  }
}
