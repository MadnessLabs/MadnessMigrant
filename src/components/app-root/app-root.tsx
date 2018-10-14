import { Component, Element, Listen, Prop } from '@stencil/core';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthService } from '../../services/auth';
import { ConfigService } from '../../services/config';
import { LanguageService } from '../../services/language';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss'
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
  modal: HTMLIonModalElement;
  routerEl: HTMLIonRouterElement;

  @Element()
  rootEl: HTMLAppRootElement;

  @Prop({ connect: 'ion-toast-controller' })
  toastCtrl: HTMLIonToastControllerElement;
  @Prop({ connect: 'ion-modal-controller' })
  modalCtrl: HTMLIonModalControllerElement;

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

  @Listen('migrantOpenLanguageModal')
  async onOpenLanguageModal() {
    this.modal = await this.modalCtrl.create({
      component: 'modal-language',
      componentProps: {
        language: this.language
      },
      backdropDismiss: true
    });
    this.modal.present();
  }

  @Listen('body:migrantSetLanguage')
  async onCloseLanguageModal() {
    if (this.modal) {
      this.modal.dismiss();
      window.location.reload();
    }
  }

  async componentWillLoad() {
    this.config = new ConfigService();
    this.auth = new AuthService(this.config.get('firebase'));
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true
    });
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

  async componentDidLoad() {
    this.routerEl = this.rootEl.querySelector('ion-router');
    await this.auth.onEmailLink();
    this.auth.onAuthChanged(async (session: firebase.User) => {
      if (session) {
        navigator.serviceWorker.ready
          .then(worker => {
            try {
              console.log('initializing firebase messaging..');
              firebase.messaging().useServiceWorker(worker);
              const messaging = firebase.messaging();
              messaging
                .requestPermission()
                .then(async () => {
                  const messagingToken = messaging.getToken();
                  await this.db
                    .collection('users')
                    .doc(session.uid)
                    .update({
                      notificationToken: await messagingToken
                    });
                  messaging.onMessage(async payload => {
                    const toast = await this.toastCtrl.create({
                      message: payload._notification.title,
                      showCloseButton: true,
                      closeButtonText: 'Dismiss'
                    });
                    await toast.present();
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            } catch (error) {
              console.log(`Your device doesn't support push notifications!`);
            }
          })
          .catch(error => {
            console.log(
              'Service worker not enabled, push notifications will not work!',
              error.message
            );
          });
        const userRef = await this.db
          .collection('users')
          .doc(session.uid)
          .get();
        if (!userRef.exists) {
          await this.db
            .collection('users')
            .doc(session.uid)
            .set({
              email: session.email,
              phone: session.phoneNumber,
              photo: session.photoURL
            });
          this.routerEl.push('profile');
        }
      }
    });
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
            url="/login"
            component="app-login"
            componentProps={this.defaultProps}
          />
          <ion-route
            url="/privacy"
            component="app-privacy"
            componentProps={this.defaultProps}
          />
          <ion-route
            url="/dashboard"
            component="app-dashboard"
            componentProps={this.defaultProps}
          />
          <ion-route
            url="/profile"
            component="app-profile"
            componentProps={this.defaultProps}
          />
          <ion-route
            url="/chat"
            component="migrant-chat"
            componentProps={this.defaultProps}
          />          
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
