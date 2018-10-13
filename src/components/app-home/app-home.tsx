import { Component, Element, Prop, State } from '@stencil/core';
import { AuthService } from '../../services/auth';
import { ConfigService } from '../../services/config';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {
  actionOptions: any;

  submitElementId = 'submit-button';

  @Element() appHomeEl: HTMLAppHomeElement;

  @Prop() auth: AuthService;
  @Prop() config: ConfigService;
  @State() viewType: any;
  @State() emailAddress: string;
  @State() emailInputEl: HTMLInputElement;
  @State() phoneNumber: any;
  @State() phoneInputEl: HTMLInputElement;
  @State() submitButtonEl: any;

  public componentWillLoad() {
// maybe
this.auth.createCaptcha(this.submitElementId);
    this.actionOptions = {
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
  }  
  componentDidLoad() {
    this.submitButtonEl = this.appHomeEl.querySelector(
      '#' + this.submitElementId
    );    
    this.emailInputEl = this.appHomeEl.querySelector('#email-login input');
    this.phoneInputEl = this.appHomeEl.querySelector('#phone-login input');
    // setTimeout(() => {

    // }, 600);    
  }

  phoneAuth() {

    this.phoneNumber = this.phoneInputEl.value;
    this.phoneNumber = '+1' + this.phoneNumber;
    const formattedNum = this.phoneNumber.replace(/(\-|\(|\)|\s)/g, '');

    this.auth
      .withPhoneNumber(formattedNum, window.RecaptchaVerifier)
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

  loginType(event, viewType) {
    event.preventDefault();
    console.log(viewType);
    
    this.viewType = viewType;
    console.log(this.viewType);
  }

  loginUser(event) {
    
    event.preventDefault();

    console.log(this.viewType);
    
    
    if (this.viewType === 'email') {
      this.emailAuth();
    } else if (this.viewType === 'phone') {
      
      this.phoneAuth();  
    } else {
      this.socialAuth();
    }
  }

  render() {
    // new branch
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content >

        <div class="facebook">
        <ion-icon name="logo-facebook"  onClick={(event) => this.loginType(event, 'facebook')}></ion-icon>
        </div>        
        <div class="phone">
          <ion-item id="phone-login">
          <ion-icon name="phone-portrait" onClick={(event) => this.loginType(event, 'phone')}></ion-icon>          
            <ion-label color="primary" >phone</ion-label>
            <ion-input placeholder="Text Input"></ion-input>
          </ion-item>        
        </div>        
        <div class="google">
        <ion-icon name="logo-googleplus" onClick={(event) => this.loginType(event, 'mail')}></ion-icon>
        </div>        
          <div class="email">
          <ion-icon name="logo-googleplus" onClick={(event) => this.loginType(event, 'mail')}></ion-icon>          
          <ion-item>
            <ion-label color="primary">Email</ion-label>
            <ion-input placeholder="Text Input"></ion-input>
          </ion-item>
        </div>
        <ion-button type="submit"
        id={this.submitElementId}
          onClick={(event) => this.loginUser(event)}>Submit</ion-button>

      </ion-content>
    ];
  }
}
