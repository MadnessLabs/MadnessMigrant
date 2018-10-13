import { Component, Prop } from '@stencil/core';

import { LanguageService } from '../../services/language';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  @Prop()
  language: LanguageService;

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <p>
          {this.language.get('introText')}
        </p>

        <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
      </ion-content>
    ];
  }
}
