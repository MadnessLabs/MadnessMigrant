import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css'
})
export class AppProfile {
  @State()
  state = false;
  @Prop()
  name: string;

  render() {
    return [
      <app-header />,
      <ion-content padding>
        <div class="avatar" />
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label>FULL NAME</ion-label>
                <ion-input placeholder="Bruce Wayne" />
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    ];
  }
}
