import { Component, Prop, Listen, State } from '@stencil/core';

import { AuthService } from '../../services/auth';
import { ConfigService } from '../../services/config';

@Component({
  tag: 'app-example',
  styleUrl: 'app-example.css'
})
export class AppExample {
  
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: HTMLIonToastControllerElement;

  /**
   * Handle service worker updates correctly.
   * This code will show a toast letting the
   * user of the PWA know that there is a
   * new version available. When they click the
   * reload button it then reloads the page
   * so that the new service worker can take over
   * and serve the fresh content
   */

  // why all the publics here???
  @State() public auth: AuthService;
  @State() public config: ConfigService;
  public defaultProps: {
    auth: AuthService;
    config: ConfigService;
  }

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

  public componentWillLoad() {
    this.config = new ConfigService();
    this.auth = new AuthService(this.config.get('firebase'));
    this.defaultProps = {
      config: this.config,
      auth: this.auth,
    };

  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" 
          component="app-home" 
          componentProps={this.defaultProps}
          />
          {/* <ion-route url="/profile/:name" component="app-profile" /> */}
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}