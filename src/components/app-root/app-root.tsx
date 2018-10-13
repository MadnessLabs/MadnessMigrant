import { Component, Prop, Listen } from '@stencil/core';

import { AuthService } from '../../services/auth';
import { ConfigService } from '../../services/config';
import { LanguageService } from '../../services/language';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  auth: AuthService;
  config: ConfigService;
  db: firebase.firestore.Firestore;
  defaultProps: {
    auth: AuthService;
    config: ConfigService;
    db: firebase.firestore.Firestore;
    language: LanguageService;
  };
  language: LanguageService;

  @Prop({ connect: 'ion-toast-controller' })
  toastCtrl: HTMLIonToastControllerElement;

  @Listen('window:swUpdate')
  async onSWUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'New version available',
      showCloseButton: true,
      closeButtonText: 'Reload'
    });
    await toast.present();
    await toast.onWillDismiss();
    window.location.reload();
  }

  async componentWillLoad() {
    this.config = new ConfigService();
    this.auth = new AuthService(this.config.get('firebase'));
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true
    });
    console.log(this.getParameterByName('lang'));
    this.language = new LanguageService(
      this.db,
      this.getParameterByName('lang')
    );

    this.defaultProps = {
      config: this.config,
      auth: this.auth,
      db: this.db,
      language: this.language
    };
  }

  getParameterByName(name) {
    const match = RegExp('[?&]' + name + '=([^&]*)').exec(
      window.location.search
    );

    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route
            url="/"
            component="app-home"
            componentProps={this.defaultProps}
          />
          <ion-route
            url="/privacy"
            component="app-privacy"
            componentProps={this.defaultProps}
          />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
