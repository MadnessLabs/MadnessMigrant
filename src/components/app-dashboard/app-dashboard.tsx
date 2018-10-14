import { Component, State } from '@stencil/core';

@Component({
  tag: 'app-dashboard',
  styleUrl: 'app-dashboard.css'
})
export class AppDashboard {
  @State()
  profiles: any = [
    {
      id: 1,
      matchedSkills: ['english', 'skill2', 'business'],
      name: 'link',
      avatar:
        'https://i.kym-cdn.com/entries/icons/original/000/017/517/images_(1).jpg'
    }
  ];

  renderSkills(skills) {
    console.log(skills);
    return (
      <div>
        {skills.map(skill => (
          <ion-badge>{skill}</ion-badge>
        ))}
      </div>
    );
  }

  render() {
    //dashboard
    return [
      <app-header />,
      <ion-content padding>
        {this.profiles.map(profile => (
          <ion-list>
            <ion-item>
              <img src={profile.avatar} />
            </ion-item>
            <ion-item>{profile.name}</ion-item>
            <ion-item>{this.renderSkills(profile.matchedSkills)}</ion-item>
          </ion-list>
        ))}
      </ion-content>
    ];
  }
}
