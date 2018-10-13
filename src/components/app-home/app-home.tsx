import { Component, Element, Prop, State } from '@stencil/core';
import { AuthService } from '../../services/auth';
import { ConfigService } from '../../services/config';

import { LanguageService } from '../../services/language';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  actionOptions = {
    url: 'www.google.com',
    iOS: {
      bundleId: 'net.madnessenjin.madnessMigrant'
    },
    android: {
      packageName: 'net.madnessenjin.madnessMigrant',
      installApp: false,
      minimumVersion: '12'
    },
    handleCodeInApp: true
  };
  @Element()
  appHomeEl: HTMLElement;

  @Prop()
  language: LanguageService;
  @Prop()
  auth: AuthService;
  @Prop()
  config: ConfigService;
  @Prop()
  viewType: any;

  @State()
  emailAddress: string;
  @State()
  emailInputEl: HTMLInputElement;
  @State()
  phoneNumber: any;
  @State()
  phoneInputEl: HTMLInputElement;
  @State()
  introText: string;

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
  public get value(): string {
    return;
  }

  phoneAuth() {
    this.phoneNumber = this.phoneInputEl.value;
    this.phoneNumber = '+1' + this.phoneNumber;
    // const formattedNum = this.phoneNumber.replace(/(\-|\(|\)|\s)/g, '');

    this.auth;
    // .withPhoneNumber(formattedNum, window.RecaptchaVerifier)
    // .then(confirmationResult => {
    // console.log(confirmationResult);

    // this.phoneConfirmResult = confirmationResult;

    // return confirmationResult;
    // })
    // .catch(error => {
    // Error;SMS not sent
    //   console.log(error);
    // });
    // .then(() => {
    //   this.hasContinued = true;
    // })
    // .catch(error => {
    //   this.error = error.message;
    // });

    return false;
  }

  emailAuth() {
    this.emailAddress = this.emailInputEl.value;
    this.auth
      .withEmailLink(this.emailAddress, this.actionOptions)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);

        // this.error = error.message;
      });

    return false;
  }

  socialAuth() {
    this.auth
      .withSocial(this.viewType)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  loginUser(event, viewType) {
    event.preventDefault();
    console.log(viewType);

    this.viewType = viewType;
    if (this.viewType === 'email') {
      this.emailAuth();
    } else if (this.viewType === 'phone') {
      this.phoneAuth();
    } else {
      this.socialAuth();
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Madness Migrant</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <migrant-text-to-speech voice={this.language.currentVoice}>
          <p>{this.introText}</p>
        </migrant-text-to-speech>
        <ion-button
          expand="block"
          onClick={() =>
            this.setLanguage(
              this.language.currentLanguage === 'es' ? 'en' : 'es'
            )
          }
        >
          Set to{' '}
          {this.language.currentLanguage === 'en' ? 'Spanish' : 'English'}
        </ion-button>
        <div class="facebook">
          <ion-button onClick={event => this.loginUser(event, 'facebook')}>
            Facebook
          </ion-button>
        </div>
        <div class="phone">
          <ion-button onClick={event => this.loginUser(event, 'phone')}>
            Phone
          </ion-button>
        </div>
        <div class="google">
          <ion-button onClick={event => this.loginUser(event, 'googe')}>
            Google
          </ion-button>
        </div>
        <div class="email">
          <ion-button onClick={event => this.loginUser(event, 'email')}>
            Email
          </ion-button>
        </div>
      </ion-content>
    ];
  }
}
