import { Component, Prop, State } from '@stencil/core';

import { LanguageService } from '../../services/language';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @Prop()
  language: LanguageService;

  @State() introText: string;

  componentDidLoad() {
    this.getVerbiage();  
  }

  async getVerbiage() {
    this.introText = await this.language.get('introText');
  }

  async setLanguage(language: string) {
    await this.language.setLanguage(language);
    await this.getVerbiage();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Madness Migrant</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <p>
          {this.introText}
        </p>

        <ion-button expand="block" onClick={() => this.setLanguage('es')}>Set to Spanish</ion-button>
      </ion-content>
    ];
  }
}
