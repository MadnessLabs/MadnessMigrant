import { Component, Prop, State } from '@stencil/core';
import { LanguageService } from '../../services/language';

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.scss'
})
export class AppDashboard {
  @Prop()
  db: firebase.firestore.Firestore;
  @Prop()
  language: LanguageService;
  @Prop()
  user: any;

  @State()
  profiles: any = [];
  @State()
  skills: any;

  async componentDidLoad() {
    console.log(this.user);
    this.skills = await this.language.get('skills');
    this.db.collection('users').onSnapshot(async snap => {
      console.log(snap);
      this.profiles = [];
      for (const doc of snap.docs) {
        console.log(doc.data());
        this.profiles.push({ ...doc.data(), id: doc.id });
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
                            <ion-badge>{this.skills[skill]}</ion-badge>
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
