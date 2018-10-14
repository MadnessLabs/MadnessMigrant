import { Component, Prop, State } from '@stencil/core';
import { LanguageService } from '../../services/language';

@Component({
  tag: 'app-privacy',
  styleUrl: 'app-privacy.css'
})
export class AppPrivacy {
  @Prop()
  language: LanguageService;

  @State()
  privacy: {
    title?: string;
    introOne?: string;
    introTwo?: string;
    whatWeCollectTitle?: string;
    whatWeCollectSubtext?: string;
    whatWeCollectBulletOne?: string;
    whatWeCollectBulletTwo?: string;
    whatWeCollectBulletThree?: string;
    whatWeCollectBulletFour?: string;
    whyWeCollectTitle?: string;
    whyWeCollectSubtext?: string;
    whyWeCollectBulletOne?: string;
    whyWeCollectBulletTwo?: string;
    whyWeCollectBulletThree?: string;
    whyWeCollectBulletFour?: string;
    whyWeCollectBulletFive?: string;
    safeguardTitle?: string;
    safegaurdSubtext?: string;
    cookieTitle?: string;
    cookieSubtext?: string;
    linksTitle?: string;
    linksSubtext?: string;
    restrictingTitle?: string;
    restrictingSubtext?: string;
  } = {};

  async componentDidLoad() {
    this.privacy = await this.language.get('privacy');
  }

  render() {
    return [
      <app-header />,
      <ion-content padding>
        <migrant-text-to-speech voice={this.language.currentVoice}>
          <ion-card padding>
            <h1>{this.privacy.title}</h1>
            <p>{this.privacy.introOne}</p>
            <p>{this.privacy.introTwo}</p>
            <h2>{this.privacy.whatWeCollectTitle}</h2>
            <p>{this.privacy.whatWeCollectSubtext}</p>
            <ul>
              <li>{this.privacy.whatWeCollectBulletOne}</li>
              <li>{this.privacy.whatWeCollectBulletTwo}</li>
              <li>{this.privacy.whatWeCollectBulletThree}</li>
              <li>{this.privacy.whatWeCollectBulletFour}</li>
            </ul>
            <h2>{this.privacy.whyWeCollectTitle}</h2>
            <p>{this.privacy.whyWeCollectSubtext}</p>
            <ul>
              <li>{this.privacy.whyWeCollectBulletOne}</li>
              <li>{this.privacy.whyWeCollectBulletTwo}</li>
              <li>{this.privacy.whyWeCollectBulletThree}</li>
              <li>{this.privacy.whyWeCollectBulletFour}</li>
              <li>{this.privacy.whyWeCollectBulletFive}</li>
            </ul>
            <h2>{this.privacy.safeguardTitle}</h2>
            <p>{this.privacy.safegaurdSubtext}</p>
            <h2>{this.privacy.cookieTitle}</h2>
            <p>{this.privacy.cookieSubtext}</p>
            <h2>{this.privacy.linksTitle}</h2>
            <p>{this.privacy.linksSubtext}</p>
            <h2>{this.privacy.restrictingTitle}</h2>
            <p>{this.privacy.restrictingSubtext}</p>
          </ion-card>
        </migrant-text-to-speech>
      </ion-content>
    ];
  }
}
