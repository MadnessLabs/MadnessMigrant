import { Component, Event, EventEmitter, Prop } from '@stencil/core';
declare const firebase: any;
@Component({
  tag: 'app-header',
  styleUrl: 'app-header.scss'
})
export class AppHeader {
  @Event()
  migrantOpenLanguageModal: EventEmitter;

  @Prop()
  titleText = 'Madness Migrant';
  @Prop()
  language: string = 'en';
  @Prop()
  photo: string;

  openLanguageModal(event) {
    this.migrantOpenLanguageModal.emit({ event });
  }

  openProfile() {
    const routerEl = document.querySelector('ion-router');
    routerEl.push('profile');
  }

  render() {
    return (
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <img src="/assets/icon/icon.png" height="35" width="35" />
          </ion-buttons>
          <ion-title>{this.titleText}</ion-title>
          <ion-buttons slot="end">
            {firebase.auth().currentUser ? (
              <img
                src="/assets/images/md-contact.svg"
                height="35"
                width="35"
                onClick={() => this.openProfile()}
              />
            ) : null}
            <img
              src={`/assets/flags/${this.language}.png`}
              height="35"
              width="35"
              onClick={event => this.openLanguageModal(event)}
            />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    );
  }
}
