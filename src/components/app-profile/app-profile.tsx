import { Component, Prop, State } from "@stencil/core";

@Component({
  tag: "app-profile",
  styleUrl: "app-profile.scss"
})
export class AppProfile {
  @State()
  state = false;
  @Prop()
  name: string;

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
          <ion-item>
            <ion-icon name="arrow-back" class="back" slot="start" />
          </ion-item>
          <ion-item class="avatar">
            <ion-icon name="create" class="edit" slot="end" />
          </ion-item>
          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">FIRST NAME</ion-label>
                  <ion-input placeholder="Bruce" />
                  <ion-icon name="create" class="edit" slot="end" />
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">LAST NAME</ion-label>
                  <ion-input placeholder="Wayne" />
                  <ion-icon name="create" class="edit" slot="end" />
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="6">
                <ion-item class="date">
                  <ion-label position="stacked">BIRTHDAY</ion-label>
                  <ion-icon name="create" class="edit" slot="end" />
                  <ion-datetime display-format="MMM DD, YYYY HH:mm" />
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item>
                  <ion-label position="stacked">BIOGRAPHY</ion-label>
                  <ion-icon name="create" class="edit" slot="end" />
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
