import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { AuthService } from '../../services/auth';
import { ConfigService } from '../../services/config';

import { LanguageService } from '../../services/language';
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  actionOptions: any;
  @Element()
  appHomeEl: HTMLElement;

  @Listen('ionChange')
  onInputChange(event) {
    if (event.path[0].name === 'phone') {
      this.phoneNumber = event.detail.value;
    } else if (event.path[0].name === 'email') {
      this.emailAddress = event.detail.value;
    }
  }

  @Prop()
  language: LanguageService;
  @Prop()
  auth: AuthService;
  @Prop()
  config: ConfigService;

  @State()
  emailAddress: string;
  @State()
  phoneNumber: any;
  @State()
  introText: string;
  @State()
  viewType: string;

  componentDidLoad() {
    const app = this.config.get('app');
    this.actionOptions = {
      url: app.url,
      iOS: {
        bundleId: 'net.madnessenjin.madnessmigrant'
      },
      android: {
        packageName: 'net.madnessenjin.madnessmigrant',
        installApp: false,
        minimumVersion: '12'
      },
      handleCodeInApp: true
    };
    this.getVerbiage();
    this.auth.createCaptcha(this.appHomeEl.querySelector('#recaptcha'));
  }

  async getVerbiage() {
    this.introText = await this.language.get('introText');
  }

  async setLanguage(language: string) {
    await this.language.setLanguage(language);
    await this.getVerbiage();
  }

  phoneAuth() {
    this.phoneNumber = '+1' + this.phoneNumber;
    const formattedNum = this.phoneNumber.replace(/(\-|\(|\)|\s)/g, '');

    this.auth
      .withPhoneNumber(formattedNum, (window as any).RecaptchaVerifier)
      .then(confirmationResult => {
        // this.phoneConfirmResult = confirmationResult;
        console.log(confirmationResult);

        return confirmationResult;
      })
      .catch(error => {
        // Error;SMS not sent
        console.log(error);
      });
    // .then(() => {
    //   this.hasContinued = true;
    // })
    // .catch(error => {
    //   this.error = error.message;
    // });

    return false;
  }

  emailAuth() {
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

  loginType(event, viewType) {
    event.preventDefault();
    this.viewType = viewType;
  }

  loginUser(event) {
    event.preventDefault();
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
      <ion-content padding>
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
          <ion-icon
            name="logo-facebook"
            onClick={event => this.loginType(event, 'facebook')}
          />
        </div>
        <div class="phone">
          <ion-item id="phone-login">
            <ion-icon
              name="phone-portrait"
              onClick={event => this.loginType(event, 'phone')}
            />
            <ion-label color="primary">phone</ion-label>
            <ion-input placeholder="Text Input" name="phone" />
          </ion-item>
        </div>
        <div class="google">
          <ion-icon
            name="logo-googleplus"
            onClick={event => this.loginType(event, 'google')}
          />
        </div>
        <div class="email">
          <ion-icon
            name="mail"
            onClick={event => this.loginType(event, 'email')}
          />
          <ion-item id="email-login">
            <ion-label color="primary">Email</ion-label>
            <ion-input placeholder="Text Input" name="email" />
          </ion-item>
        </div>
        {this.viewType ? (
          <ion-button
            type="submit"
            id="submit-button"
            onClick={event => this.loginUser(event)}
          >
            Submit
          </ion-button>
        ) : null}
        <button id="recaptcha" />
      </ion-content>
    ];
  }
}
