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
            <ion-icon name="create"></ion-icon>
          </div>
          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">FIRST NAME</ion-label>
                  <ion-input placeholder="Bruce">
                    <ion-icon name="create" slot="end"></ion-icon>
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
              <ion-col size="6">
                <ion-item class="date">
                  <ion-label position="stacked">BIRTHDAY</ion-label>
                  <ion-datetime display-format="MMM DD, YYYY HH:mm"></ion-datetime>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">BIOGRAPHY</ion-label>
                  <ion-textarea>
                  </ion-textarea>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
          <migrant-skills></migrant-skills>
        </ion-card>   

      </ion-content>
    ];
  }
}
