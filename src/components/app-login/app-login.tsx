import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { AuthService } from '../../services/auth';
import { ConfigService } from '../../services/config';

import { LanguageService } from '../../services/language';
@Component({
  tag: 'app-login',
  styleUrl: 'app-login.scss'
})
export class AppLogin {
  actionOptions: any;
  sliderEl: HTMLIonSlidesElement;
  sliderOptions: any = {
    allowTouchMove: false,
    simulateTouch: false,
    autoplay: false
  };

  @Element()
  appLoginEl: HTMLElement;

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
  db: firebase.firestore.FieldValue;
  @Prop()
  config: ConfigService;

  @State()
  emailAddress: string;
  @State()
  error: string;
  @State()
  phoneNumber: any;
  @State()
  viewType: string;
  @State()
  availableLanguages: {
    name: string;
    code: string;
  }[] = [];
  @State()
    onboardingText: {
    back?: string;
    continue?: string;
    createAccount?: string;
    emailSentTitle?: string;
    emailSentSubtext?: string;
    placeholderEmail?: string;
    setLanguage?: string;
  } = {};
  @State()
  stepTitle: string;

  async componentDidLoad() {
    this.sliderEl = this.appLoginEl.querySelector('ion-slides');
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
    await this.getVerbiage();
    this.auth.createCaptcha(this.appLoginEl.querySelector('#recaptcha'));
    this.availableLanguages = await this.language.list();
  }

  async getVerbiage() {
    this.onboardingText = await this.language.get('onboarding');
    this.setStepTitle();
  }

  async setLanguage(language: string) {
    await this.language.setLanguage(language);
    await this.getVerbiage();
  }

  async setStepTitle() {
    const currentStep = await this.sliderEl.getActiveIndex();
    if (currentStep === 0) {
      this.stepTitle = this.onboardingText.setLanguage;
    } else if (currentStep === 1) {
      this.stepTitle = this.onboardingText.createAccount;
    } else if (currentStep === 2) {
      this.stepTitle = this.onboardingText.emailSentTitle;
    }
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
        this.error = error.message;
        console.log(error);
      });

    return false;
  }

  emailAuth() {
    this.error = null;
    this.auth
      .withEmailLink(this.emailAddress, this.actionOptions)
      .then(data => {
        console.log(data);
        this.slideNext();
      })
      .catch(error => {
        console.log(error);
        this.error = error.message;
      });
  }

  socialAuth(type: string) {
    this.error = null;
    this.auth
      .withSocial(type)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        this.error = error.message;
      });
  }

  slideNext() {
    this.error = null;
    this.sliderEl.slideNext();
    this.setStepTitle();
  }

  slidePrev() {
    this.error = null;
    this.sliderEl.slidePrev();
    this.setStepTitle();
  }

  render() {
    return [
      <app-header />,
      <ion-content padding>
        <ion-card>
          <ion-card-title>
            <migrant-text-to-speech voice={this.language.currentVoice}>
              <h1>{this.stepTitle}</h1>
            </migrant-text-to-speech>
          </ion-card-title>
          <ion-card-content>
            {this.error ? (
              <p class="error-message">
                <ion-icon name="alert" />
                {this.error}
              </p>
            ) : null}
            <ion-slides options={this.sliderOptions}>
              <ion-slide id="language">
                <ion-grid>
                  <ion-row>
                    {this.availableLanguages.map(language => (
                      <ion-col onClick={() => this.setLanguage(language.code)}>
                        <div
                          class={
                            this.language.currentLanguage === language.code
                              ? 'flag active'
                              : 'flag'
                          }
                          style={{
                            backgroundImage: `url('./assets/flags/${
                              language.code
                            }.png')`
                          }}
                        >
                          {this.language.currentLanguage === language.code ? (
                            <ion-icon name="checkmark-circle" />
                          ) : null}
                        </div>
                        <b>{language.name}</b>
                      </ion-col>
                    ))}
                  </ion-row>
                  <div class="onboarding-controls">
                    <ion-button
                      onClick={() => this.slideNext()}
                      color="secondary"
                    >
                      {this.onboardingText.continue}
                    </ion-button>
                  </div>
                </ion-grid>
              </ion-slide>
              <ion-slide>
                <ion-grid>
                  <ion-row>
                    <ion-col>
                      {/* <div class="phone">
                      <ion-item id="phone-login">
                        <ion-icon
                          name="phone-portrait"
                          onClick={event => this.loginType(event, 'phone')}
                        />
                        <ion-label color="primary">phone</ion-label>
                        <ion-input placeholder="Text Input" name="phone" />
                      </ion-item>
                    </div> */}
                      <ion-item id="email-login">
                        <ion-label position="stacked">Email</ion-label>
                        <ion-input
                          placeholder={this.onboardingText.placeholderEmail}
                          name="email"
                        />
                      </ion-item>
                      <div id="social-logins">
                        <ion-button
                          class="facebook"
                          expand="block"
                          color="light"
                          onClick={() => this.socialAuth('facebook')}
                        >
                          <ion-icon slot="start" name="logo-facebook" />
                          Facebook
                        </ion-button>
                        <ion-button
                          class="google"
                          expand="block"
                          color="light"
                          onClick={() => this.socialAuth('google')}
                        >
                          <ion-icon name="logo-google" slot="start" />
                          Google
                        </ion-button>
                      </div>
                      <button id="recaptcha" />
                    </ion-col>
                  </ion-row>
                  <div class="onboarding-controls">
                    <ion-button onClick={() => this.slidePrev()} color="dark">
                      {this.onboardingText.back}
                    </ion-button>
                    <ion-button
                      onClick={() => this.emailAuth()}
                      color="secondary"
                    >
                      {this.onboardingText.continue}
                    </ion-button>
                  </div>
                </ion-grid>
              </ion-slide>
              <ion-slide id="email-sent">
                <div>
                  <div class="icon-wrapper">
                    <ion-icon name="mail" color="medium" />
                  </div>
                  <h2>{this.onboardingText.emailSentSubtext}</h2>
                </div>
              </ion-slide>
            </ion-slides>
            <a href="/privacy" class="privacy">Privacy Policy</a>
          </ion-card-content>
        </ion-card>
      </ion-content>
    ];
  }
}
