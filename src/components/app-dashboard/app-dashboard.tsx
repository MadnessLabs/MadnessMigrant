import { Component, Prop, State } from '@stencil/core';
import { LanguageService } from '../../services/language';

import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.scss'
})
export class AppDashboard {
  @Prop()
  db: firebase.firestore.Firestore;
  @Prop()
  language: LanguageService;

  @State()
  user: any;
  @State()
  profiles: any = [];
  @State()
  skills: any;

  async componentDidLoad() {
    const currentUser = firebase.auth().currentUser;
    const userRef = await this.db
      .collection('users')
      .doc(currentUser.uid)
      .get();
    this.user = userRef.data();
    this.skills = await this.language.get('skills');
    this.db.collection('users').onSnapshot(async snap => {
      this.profiles = [];
      for (const doc of snap.docs) {
        if (doc.data().skills) {
          this.profiles.push({ ...doc.data(), id: doc.id });
        }
      }
    });
  }

  render() {
    return [
      <app-header language={this.language.currentLanguage} isLoggedIn />,
      <ion-content>
        <ion-card class="dashboard">
          {this.profiles.map(profile => (
            <ion-list>
              <ion-item>
                <div
                  class="photo"
                  slot="start"
                  style={{
                    backgroundImage: `url('${
                      profile.photo
                        ? profile.photo
                        : './assets/images/md-contact.svg'
                    }')`
                  }}
                />
                <div>
                  <h2>
                    {profile.firstName} {profile.lastName}
                  </h2>
                  {
                    <div>
                      {profile && profile.skills
                        ? profile.skills.map(skill => (
                            <ion-badge
                              color={
                                this.user.skills.indexOf(skill) >= 0
                                  ? 'secondary'
                                  : 'primary'
                              }
                            >
                              {this.skills[skill]}
                            </ion-badge>
                          ))
                        : null}
                    </div>
                  }
                </div>
                <ion-button href="/chat" color="secondary" slot="end">
                  <ion-icon name="chatboxes" />
                </ion-button>
              </ion-item>
            </ion-list>
          ))}
        </ion-card>
      </ion-content>
    ];
  }
}
