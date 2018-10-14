import { Component, Listen, Prop, State } from '@stencil/core';
import { LanguageService } from '../../services/language';
import firebase from 'firebase/app';
import 'firebase/auth';
@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.scss'
})
export class AppProfile {
  @Listen('ionChange')
  async onIonChange(event) {
    if (!this.session || !this.session.uid) {
      return false;
    }
    if (event.detail.name) {
      await this.db
        .collection('users')
        .doc(this.session.uid)
        .update({ [event.detail.name]: event.detail.value });
    } else if (event.path[0].name) {
      await this.db
        .collection('users')
        .doc(this.session.uid)
        .update({ [event.path[0].name]: event.detail.value });
    } else if (event.detail.value.day) {
      await this.db
        .collection('users')
        .doc(this.session.uid)
        .update({
          birthday: `${event.detail.value.month}-${event.detail.value.day}-${
            event.detail.value.year
          }`
        });
    }
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
  @State()
  session: firebase.User;

  async componentDidLoad() {
    this.profileText = await this.language.get('profile');
    this.skills = await this.language.get('skills');
    this.session = firebase.auth().currentUser;
    this.profile = (await this.db
      .collection('users')
      .doc(this.session.uid)
      .get()).data();
  }

  render() {
    return [
      <app-header language={this.language.currentLanguage} />,
      <ion-content>
        <ion-button expand="block" href="/dashboard">
          <ion-icon name="people" slot="start" />
          <ion-label>See Mentor Matches</ion-label>
        </ion-button>
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
                <ion-col size="12" sizeMd="6">
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
                <ion-col size="12" sizeMd="6">
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
                <ion-col size="12" sizeMd="6">
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
                <ion-col size="12" sizeMd="6">
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
              <ion-row>
                <ion-col size="12" sizeMd="6">
                  <ion-item>
                    <ion-label position="stacked">Email</ion-label>
                    <ion-input name="email" value={this.profile.email} />
                  </ion-item>
                </ion-col>
                <ion-col size="12" sizeMd="6">
                  <ion-item>
                    <ion-label position="stacked">Phone</ion-label>
                    <ion-input name="phone" value={this.profile.lastName} />
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
              interests={this.profile.skills}
              voice={this.language.currentVoice}
            />
          </ion-card-content>
        </ion-card>
      </ion-content>
    ];
  }
}
