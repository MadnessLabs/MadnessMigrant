import firebase from 'firebase/app';
import 'firebase/auth';
export class AuthService {
  public service: firebase.auth.Auth;
  public session: any;

  constructor(config?: any) {
    let firstRun = true;
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    this.service = firebase.auth();

    if (firstRun) {
      this.service
        .getRedirectResult()
        .then(data => {
          console.log(data);
          if (data && data.user) {
            this.emitLoggedInEvent(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
      firstRun = false;
    }
  }

  async onEmailLink() {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      const authUser = await firebase
        .auth()
        .signInWithEmailLink(email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');

      this.emitLoggedInEvent(authUser);

      return authUser;
    }
  }

  createCaptcha(buttonEl: any) {
    console.log('inrecaptcah');

    (<any>window).RecaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      buttonEl,
      {
        size: 'invisible',
        callback: function() {
          // Captcha Created
          console.log('wee');
          // if (callback && typeof callback === 'function') {
          //   callback();
          // }
        }
      }
    );
  }

  withPhoneNumber(phoneNumber: string, capId: any) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    phoneNumber = '+' + phoneNumber;
    window.localStorage.setItem('phoneForSignIn', phoneNumber);

    return this.service.signInWithPhoneNumber(phoneNumber, capId);
  }

  withEmailLink(email: string, actionCodeSettings: any) {
    window.localStorage.setItem('emailForSignIn', email);

    return this.service.sendSignInLinkToEmail(email, actionCodeSettings);
  }

  anonymously() {
    return this.service.signInAnonymously();
  }

  onAuthChanged(callback) {
    this.service.onAuthStateChanged(session => {
      if (
        !session ||
        (!session.emailVerified &&
          session.providerData &&
          session.providerData[0].providerId === 'password')
      ) {
        return false;
      }
      if (session) {
        localStorage.setItem('raf:session', JSON.stringify(session));
      }
      if (callback && typeof callback === 'function') {
        callback(session);
      }
    });

    if (!localStorage.getItem('raf:session')) {
      callback(null);
    }
  }

  getFromStorage() {
    return localStorage.getItem('referaflood:session')
      ? JSON.parse(localStorage.getItem('referaflood:session'))
      : null;
  }

  isLoggedIn() {
    return firebase.auth().currentUser
      ? firebase.auth().currentUser
      : this.getFromStorage();
  }

  emitLoggedInEvent(data) {
    document.body.dispatchEvent(
      new CustomEvent('authLoggedIn', { detail: { data } })
    );
  }

  emitLoggedOutEvent() {
    document.body.dispatchEvent(
      new CustomEvent('authLoggedOut', { detail: {} })
    );
  }

  createUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      try {
        this.service
          .createUserWithEmailAndPassword(email, password)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  sendEmailVerification(options?) {
    return this.service.currentUser.sendEmailVerification(
      options ? options : null
    );
  }

  sendPasswordReset(emailAddress: string, options?) {
    return this.service.sendPasswordResetEmail(
      emailAddress,
      options ? options : null
    );
  }

  withEmail(email: string, password: string) {
    return new Promise((resolve, reject) => {
      try {
        this.service
          .signInWithEmailAndPassword(email, password)
          .then(user => {
            this.emitLoggedInEvent({ user });
            resolve({ data: { user } });
          })
          .catch(error => {
            reject(error);
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  googleNative(): Promise<any> {
    return new Promise((resolve, reject) => {
      (<any>window).plugins.googleplus.login(
        {
          webClientId:
            '491790079478-6ciehmvvrcb8erai5bso2ahk5bhih5nv.apps.googleusercontent.com',
          offline: true
        },
        googleData => {
          const credential = firebase.auth.GoogleAuthProvider.credential(
            googleData.idToken
          );
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(firebaseData => {
              resolve(firebaseData);
            });
        },
        error => {
          reject(error);
        }
      );
    });
  }

  withSocial(network: string, redirect = false): Promise<any> {
    let provider;
    let shouldRedirect = redirect;
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('Running in PWA mode...');
      shouldRedirect = shouldRedirect ? shouldRedirect : true;
    }

    return new Promise((resolve, reject) => {
      if ((<any>window).cordova) {
        if (network === 'google') {
          console.log('trying google native login');
          this.googleNative()
            .then(result => {
              console.log(result);
              resolve(result);
            })
            .catch(error => {
              console.log(error);
              reject(error);
            });
        }
      } else {
        console.log(network);

        if (network === 'facebook') {
          provider = new firebase.auth.FacebookAuthProvider();
        } else if (network === 'google') {
          provider = new firebase.auth.GoogleAuthProvider();
        } else if (network === 'twitter') {
          provider = new firebase.auth.TwitterAuthProvider();
        } else {
          reject({
            message:
              'A social network is required or the one provided is not yet supported.'
          });
        }
        const authService: any = this.service;
        authService[shouldRedirect ? 'signInWithRedirect' : 'signInWithPopup'](
          provider
        )
          .then(data => {
            this.emitLoggedInEvent(data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  logout() {
    this.emitLoggedOutEvent();

    return this.service.signOut();
  }

  async updatePassword(newPassword: string) {
    // await user.reauthenticateWithCredential(credential);

    return firebase.auth().currentUser.updatePassword(newPassword);
  }
}
