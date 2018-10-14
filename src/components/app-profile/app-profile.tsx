import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {
  @State() state = false;
  @Prop() name: string;

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/" />
          </ion-buttons>
          <ion-title>Profile: {this.name}</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <div class="avatar">
        </div>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label>FULL NAME</ion-label>
                <ion-input placeholder="Bruce Wayne">

                </ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
        
      </ion-content>
    ];
  }
}
