import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css'
})
export class AppHeader {
  @Prop()
  title = 'Madness Migrant';

  render() {
    return (
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <img src="/assets/icon/icon.png" height="35" width="35" />
          </ion-buttons>
          <ion-title>{this.title}</ion-title>
        </ion-toolbar>
      </ion-header>
    );
  }
}
