import { Component, Prop, State } from '@stencil/core';
import { LanguageService } from '../../services/language';

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.scss'
})
export class AppDashboard {
  @Prop()
  language: LanguageService;

  @State()
  profiles: any = [
    {
      id: 1,
      matchedSkills: ['english', 'skill2', 'business'],
      name: 'Link',
      avatar:
        'https://i.kym-cdn.com/entries/icons/original/000/017/517/images_(1).jpg'
    },
    {
      id: 2,
      matchedSkills: ['marketing', 'tutoring', 'business'],
      name: 'Look-a-like',
      avatar:
        'https://i.kym-cdn.com/entries/icons/original/000/017/517/images_(1).jpg'
    }
  ];

  render() {
    return [
      <app-header language={this.language.currentLanguage} />,
      <ion-content>
        <ion-card class="dashboard">
          {this.profiles.map(profile => (
            <ion-list>
              <ion-item>
                <img slot="start" src={profile.avatar} />
                <div>
                  <h2>{profile.name}</h2>
                  {
                    <div>
                      {profile.matchedSkills.map(skill => (
                        <ion-badge>{skill}</ion-badge>
                      ))}
                    </div>
                  }
                </div>
              </ion-item>
            </ion-list>
          ))}
        </ion-card>
      </ion-content>
    ];
  }
}
