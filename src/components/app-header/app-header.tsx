import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {
  @Prop()
  titleText = 'Madness Migrant';

  render() {
    return (
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <img src="/assets/icon/icon.png" height="35" width="35" />
          </ion-buttons>
          <ion-title>{this.titleText}</ion-title>
        </ion-toolbar>
      </ion-header>
    );
  }
}
