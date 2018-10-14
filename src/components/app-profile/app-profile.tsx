import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.scss'
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

        <ion-card>
          <div class="avatar">
          </div>
          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">FIRST NAME</ion-label>
                  <ion-input placeholder="Bruce">

                  </ion-input>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">LAST NAME</ion-label>
                  <ion-input placeholder="Wayne">

                  </ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-item>
                <ion-label position="stacked">Date</ion-label>
                <ion-datetime display-format="MMM DD, YYYY HH:mm"></ion-datetime>
              </ion-item>
            </ion-row>
          </ion-grid>
        </ion-card>   

      </ion-content>
    ];
  }
}
