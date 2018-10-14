import { Component, Listen, Prop, State } from '@stencil/core';
import { LanguageService } from '../../services/language';

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
  @Prop()
  language: LanguageService;

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
  @State()
  profileText: {
    personalTitle?: string;
    personalSubtext?: string;
    personalFirstNameLabel?: string;
    personalFirstNamePlaceholder?: string;
    personalLastNameLabel?: string;
    personalLastNamePlaceholder?: string;
    personalBirthdayLabel?: string;
    personalBirthdayPlaceholder?: string;
    personalBioLabel?: string;
    personalBioPlaceholder?: string;
    skillsTitle?: string;
    skillsSubtext?: string;
  } = {};
  @State()
  skills: any;

  async componentDidLoad() {
    this.profileText = await this.language.get('profile');
    this.skills = await this.language.get('skills');
  }

  render() {
    return [
      <app-header />,
      <ion-content>
        <ion-card>
          <migrant-text-to-speech voice={this.language.currentVoice}>
            <ion-card-title>{this.profileText.personalTitle}</ion-card-title>
            <p class="subtext">{this.profileText.personalSubtext}</p>
          </migrant-text-to-speech>
          <ion-card-content>
            <migrant-photo-uploader
              photo={this.profile.photo}
              path="users/"
              fallback="./assets/images/md-contact.svg"
            />
            <ion-grid>
              <ion-row>
                <ion-col>
                  <ion-item>
                    <ion-label position="stacked">
                      {this.profileText.personalFirstNameLabel}
                    </ion-label>
                    <ion-input
                      placeholder={
                        this.profileText.personalFirstNamePlaceholder
                      }
                      name="firstName"
                      value={this.profile.firstName}
                    />
                  </ion-item>
                </ion-col>
                <ion-col>
                  <ion-item>
                    <ion-label position="stacked">
                      {this.profileText.personalLastNameLabel}
                    </ion-label>
                    <ion-input
                      placeholder={this.profileText.personalLastNamePlaceholder}
                      name="lastName"
                      value={this.profile.lastName}
                    />
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <ion-item class="date">
                    <ion-label position="stacked">
                      {this.profileText.personalBirthdayLabel}
                    </ion-label>
                    <ion-datetime
                      display-format="MM-DD-YYYY"
                      placeholder={this.profileText.personalBirthdayPlaceholder}
                      value={this.profile.birthday}
                    />
                  </ion-item>
                </ion-col>
                <ion-col>
                  <ion-item>
                    <ion-label position="stacked">
                      {this.profileText.personalBioLabel}
                    </ion-label>
                    <ion-textarea
                      placeholder={this.profileText.personalBioPlaceholder}
                      name="bio"
                      value={this.profile.bio ? this.profile.bio : ''}
                    />
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-card>
        <ion-card>
          <migrant-text-to-speech voice={this.language.currentVoice}>
            <ion-card-title>{this.profileText.skillsTitle}</ion-card-title>
            <p class="subtext">{this.profileText.skillsSubtext}</p>
          </migrant-text-to-speech>
          <ion-card-content>
            <migrant-skills
              skills={this.skills}
              voice={this.language.currentVoice}
            />
          </ion-card-content>
        </ion-card>
      </ion-content>
    ];
  }
}
