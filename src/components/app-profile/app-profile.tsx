import { Component, Listen, Prop, State } from '@stencil/core';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.scss'
})
export class AppProfile {
  @Listen('ionChange')
  onIonChange(event) {
    console.log(event);
  }

  @Prop()
  db: firebase.firestore.Firestore;

  @State()
  profile: {
    firstName?: string;
    lastName?: string;
    photo?: string;
    skills?: number[];
    language?: string;
    email?: string;
    phone?: string;
    bio?: string;
    birthday?: string;
    location?: string;
  } = {};

  render() {
    return [
      <app-header />,
      <ion-content padding>
        <ion-card padding>
          <migrant-photo-uploader
            photo={this.profile.photo}
            path="users/"
            fallback="./assets/images/md-contact.svg"
          />
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-label position="stacked">FIRST NAME</ion-label>
                  <ion-input placeholder="Bruce" />
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item>
                  <ion-label position="stacked">LAST NAME</ion-label>
                  <ion-input placeholder="Wayne" />
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-item class="date">
                  <ion-label position="stacked">BIRTHDAY</ion-label>
                  <ion-datetime display-format="MMM DD, YYYY HH:mm" />
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item>
                  <ion-label position="stacked">BIOGRAPHY</ion-label>
                  <ion-textarea placeholder="Tell us a little bit about yourself" />
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
          <migrant-skills />
        </ion-card>
      </ion-content>
    ];
  }
}
