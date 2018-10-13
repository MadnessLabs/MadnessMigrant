// import {
//   Component,
//   Element,
//   Event,
//   EventEmitter,
//   Listen,
//   Prop,
//   State,
//   Watch
// } from '@stencil/core';
// import { AuthService } from '../../services/auth';
// import { ConfigService } from '../../services/config';
// declare global {
//   interface Window {
//     RecaptchaVerifier: any;
//     hasContinued: any;
//   }
// }
// @Component({
//   tag: 'app-login',
//   styleUrl: 'app-login.scss'
// })
// export class AppLogin {
//   actionOptions: any;

//   submitElementId = 'submit-button';
//   phoneInputInitVal = '';
//   emailInputInitVal = '';
//   loginOptions = [
//     {
//       icon: 'md-phone-portrait'
//     },
//     {
//       icon: 'md-mail'
//     },
//     {
//       icon: 'logo-google'
//     },
//     {
//       icon: 'logo-facebook'
//     },
//     {
//       icon: 'logo-twitter'
//     }
//   ];
//   viewMap: string[] = ['phone', 'email', 'google', 'facebook', 'twitter'];
//   slider: HTMLIonSlidesElement;
//   sliderOptions: any = {
//     allowTouchMove: false,
//     simulateTouch: false
//   };
//   captchaCreated: boolean;

//   @Element() loginCardEl: HTMLAppLoginElement;

//   @Event() rafLoginEvent: EventEmitter;

//   @Prop() session: RAF.User.ISession;
//   @Prop() auth: AuthService;
//   @Prop() config: ConfigService;
//   @Prop() icon: string;
//   @Prop() messageGoo: string;
//   @Prop() messageFb: string;
//   @Prop() messageTwitter: string;

//   @State() error: boolean | string = false;
//   @State() isValidationMsg = false;
//   @State() validationHasStarted = false;
//   @State() isValid: boolean;
//   @State() hasContinued = false;
//   @State() isUnverified: boolean;
//   @State() validationMsgHolder = '';
//   @State() clickMessageHolder = '';
//   @State() defaultClickMessage = 'Click to continue for your code or link!';
//   @State() emailAddress: string;
//   @State() phoneNumber: string;
//   @State() phoneConfirmResult: any = false;
//   @State() confirmCodeVal: string;
//   @State() viewType = 'phone';

//   // Elments Assigned when view's input is clicked. Elemnts may not be present when component first loads
//   @State() emailInputEl: HTMLInputElement;
//   @State() phoneInputEl: HTMLInputElement;
//   @State() phoneConfirmCodeEl: HTMLInputElement;
//   @State() submitButtonEl: HTMLInputElement;

//   @Watch('session')
//   onSessionChange() {
//     this.isUnverified = this.session && !this.session.emailVerified;
//   }

//   @Listen('rafOptionSelected')
//   onOptionSelected(event) {
//     this.validationMsgHolder = null;
//     this.isValid ? (this.isValid = false) : null;
//     if (
//       this.viewType === 'google' ||
//       this.viewType === 'facebook' ||
//       this.viewType === 'twitter'
//     ) {
//       this.submitButtonEl.removeAttribute('disabled');
//     }
//     if (this.slider && event && event.detail && event.detail.selectedOption) {
//       this.viewType = this.viewMap[event.detail.selectedOption.index];
//       this.slider.slideTo(event.detail.selectedOption.index);
//     }
//   }

//   @Listen('rafInputChange')
//   onInputChange(event) {
//     event.preventDefault();
//     this.checkValidity();
//   }

//   componentDidLoad() {
//     this.emailInputEl = this.loginCardEl.querySelector('#email-login input');
//     this.phoneInputEl = this.loginCardEl.querySelector('#phone-login input');
//     this.submitButtonEl = this.loginCardEl.querySelector(
//       '#' + this.submitElementId
//     );
//     setTimeout(() => {
//       this.slider.slideTo(5);
//       setTimeout(() => {
//         this.slider.slideTo(0);
//         this.slider.update();
//         this.auth.createCaptcha(this.submitElementId);
//       }, 300);
//     }, 300);
//     this.slider = this.loginCardEl.querySelector('ion-slides');
//     const app = this.config.get('app');
//     this.actionOptions = {
//       url: app.url,
//       iOS: {
//         bundleId: 'net.madnessenjin.referaflood'
//       },
//       android: {
//         packageName: 'net.madnessenjin.referaflood',
//         installApp: false,
//         minimumVersion: '12'
//       },
//       handleCodeInApp: true
//     };
//   }

//   // auth methods
//   emailAuth() {
//     this.emailAddress = this.emailInputEl.value;
//     this.auth
//       .withEmailLink(this.emailAddress, this.actionOptions)
//       .then(data => {
//         console.log(data);
//       })
//       .catch(error => {
//         this.error = error.message;
//       });

//     return false;
//   }

//   phoneAuth() {
//     this.phoneNumber = this.phoneInputEl.value;
//     this.phoneNumber = '+1' + this.phoneNumber;
//     const formattedNum = this.phoneNumber.replace(/(\-|\(|\)|\s)/g, '');

//     this.auth
//       .withPhoneNumber(formattedNum, window.RecaptchaVerifier)
//       .then(confirmationResult => {
//         this.phoneConfirmResult = confirmationResult;

//         return confirmationResult;
//       })
//       .catch(error => {
//         // Error;SMS not sent
//         console.log(error);
//       });
//     // .then(() => {
//     //   this.hasContinued = true;
//     // })
//     // .catch(error => {
//     //   this.error = error.message;
//     // });

//     return false;
//   }

//   socialAuth() {
//     this.auth
//       .withSocial(this.viewType)
//       .then(data => {
//         this.rafLoginEvent.emit({ data });
//       })
//       .catch(error => {
//         this.error = error.message;
//       });
//   }

//   loginUser(event) {
//     event.preventDefault();
//     if (this.viewType === 'email') {
//       this.changeContinuedState();
//       this.emailAuth();
//     } else if (this.viewType === 'phone') {
//       if (this.phoneConfirmResult === false) {
//         this.changeContinuedState();
//         this.phoneAuth();
//       } else {
//         this.phoneConfirmCodeEl = this.loginCardEl.querySelector(
//           '.confirm-inputs input'
//         );
//         this.confirmCodeVal = this.phoneConfirmCodeEl.value;
//         this.phoneConfirmResult
//           .confirm(this.confirmCodeVal)
//           .then(result => {
//             const user = result.user;
//             console.log(user);
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       }
//     } else {
//       this.socialAuth();
//     }
//   }

//   // form methods
//   changeContinuedState() {
//     this.hasContinued
//       ? (this.hasContinued = false)
//       : (this.hasContinued = true);
//     this.isValid = false;
//     this.isValid ? (this.isValid = false) : (this.isValid = true);
//   }

//   phoneIsValid() {
//     this.phoneInputInitVal = this.phoneInputEl.value;
//     this.isValid = true;
//   }

//   phoneIsntValid() {
//     this.phoneInputInitVal = this.phoneInputEl.value;
//     this.isValid = false;
//   }

//   checkPhoneValidity() {
//     const telRexEx = /\d{3}-\d{3}-\d{4}/;
//     const phoneVal = this.phoneInputEl.value;
//     const isPhoneValid = telRexEx.test(phoneVal);
//     // when button is enabled login method can be accessed
//     isPhoneValid ? this.phoneIsValid() : this.phoneIsntValid();
//   }

//   emailIsValid() {
//     this.emailInputInitVal = this.emailInputEl.value;
//     this.isValid = true;
//   }

//   emailIsntValid() {
//     this.emailInputInitVal = this.emailInputEl.value;
//     this.isValid = false;
//   }

//   checkEmailValidity() {
//     const emailRexEx = /.+\@.+\.\w{3,}/;
//     const emailVal = this.emailInputEl.value;
//     const isEmailValid = emailRexEx.test(emailVal);
//     isEmailValid ? this.emailIsValid() : this.emailIsntValid();
//   }

//   checkValidity() {
//     this.validationHasStarted ? null : this.clearInputs();
//     this.validationHasStarted = true;
//     if (this.viewType === 'email') {
//       this.checkEmailValidity();
//       this.validationMsgHolder =
//         'Please use the following format "example@example.com"';
//     } else if (this.viewType === 'phone') {
//       this.checkPhoneValidity();
//       this.validationMsgHolder =
//         'Please use the following format "314-518-0888"';
//     }
//   }

//   clearInputs() {
//     if (this.viewType === 'email') {
//       this.emailInputEl.value = '';
//     } else if (this.viewType === 'phone') {
//       this.phoneInputEl.value = '';
//     }
//   }

//   // render logic methods
//   determineView(event, type) {
//     // performs state change
//     event.preventDefault();
//     this.viewType = type;
//   }

//   renderClickMessageHolder() {
//     return <p class="validation-text">{this.clickMessageHolder}</p>;
//   }

//   renderPhoneConfirmCode() {
//     return (
//       <div class="phone-confirm-code">
//         <div class="confirm-instructions">
//           <p class="waiting-icon">
//             <ion-icon name="code-working" />
//           </p>
//           <p>We just sent you a code, please enter it below!</p>
//         </div>
//         <ion-item class="confirm-inputs">
//           <ion-label>Code</ion-label>
//           <ion-input placeholder="Ex: 880-908" type="text" />
//         </ion-item>
//       </div>
//     );
//   }

//   renderPhoneInputs() {
//     const preContinue = (
//       <raf-input
//         label="Phone Number"
//         id="phone-login"
//         type="phone"
//         name="phone"
//         placeholder="You'll receive a text message"
//         iconRight={this.isValid ? 'md-checkmark-circle' : null}
//         value={this.phoneInputInitVal}
//       />
//     );
//     const postContinue = this.renderPhoneConfirmCode();

//     return this.hasContinued ? postContinue : preContinue;
//   }

//   renderEmailInputs() {
//     return (
//       <raf-input
//         placeholder="example@gmail.com"
//         label="Email Address"
//         name="email"
//         id="email-login"
//         type="text"
//         iconRight={this.isValid ? 'md-checkmark-circle' : null}
//         value={this.emailInputInitVal}
//       />
//     );
//   }

//   renderGoogleAuth() {
//     return (
//       <div class="social-media-auth">
//         <p class="social-icon">
//           <ion-icon name={this.icon} />
//         </p>
//         <p>{this.messageGoo}</p>
//       </div>
//     );
//   }

//   renderFacebookAuth() {
//     return (
//       <div class="social-media-auth">
//         <p class="social-icon">
//           <ion-icon name={this.icon} />
//         </p>
//         <p>{this.messageFb}</p>
//       </div>
//     );
//   }

//   renderTwitterAuth() {
//     return (
//       <div class="social-media-auth">
//         <p class="social-icon">
//           <ion-icon name={this.icon} />
//         </p>
//         <p>{this.messageTwitter}</p>
//       </div>
//     );
//   }

//   renderPreContinue() {
//     return (
//       <ion-list class="cta pre-continue">
//         <button>Help</button>
//         <button
//           id={this.submitElementId}
//           type="submit"
//           disabled={!this.isValid}
//         >
//           Continue
//         </button>
//       </ion-list>
//     );
//   }

//   renderPostContinue() {
//     return (
//       <ion-list class="cta post-continue">
//         <button>Resend Code</button>
//         <button
//           id="submit-button"
//           class="code-submit"
//           type="submit"
//           disabled={!this.isValid}
//           onClick={event => this.loginUser(event)}
//         >
//           Sign In
//         </button>
//       </ion-list>
//     );
//   }

//   render() {
//     return (
//       <ion-content>
//         <header>
//           <img
//             src="./assets/ReferAFlood-Logo-Black.svg"
//             alt="Refer a flood logo"
//           />
//           <raf-select-bar options={this.loginOptions} />
//         </header>
//         <section>
//           <p class="validation-text invalid-text">
//             {this.validationMsgHolder ? this.validationMsgHolder : ' '}
//           </p>
//           <form onSubmit={event => this.loginUser(event)}>
//             <ion-slides pager={false} options={this.sliderOptions}>
//               <ion-slide>{this.renderPhoneInputs()}</ion-slide>
//               <ion-slide>{this.renderEmailInputs()}</ion-slide>
//               <ion-slide>{this.renderGoogleAuth()}</ion-slide>
//               <ion-slide>{this.renderFacebookAuth()}</ion-slide>
//               <ion-slide>{this.renderTwitterAuth()}</ion-slide>
//             </ion-slides>
//             {this.hasContinued
//               ? this.renderPostContinue()
//               : this.renderPreContinue()}
//           </form>
//         </section>
//       </ion-content>
//     );
//   }
// }