import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {
  @Prop()
  titleText = 'Madness Migrant';
  @Prop()
  language: string = 'en';

  render() {
    return (
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <img src="/assets/icon/icon.png" height="35" width="35" />
          </ion-buttons>
          <ion-title>{this.titleText}</ion-title>
          <ion-buttons slot="end">
            <img
              src={`/assets/flags/${this.language}.png`}
              height="35"
              width="35"
            />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    );
  }
}
