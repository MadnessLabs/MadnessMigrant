import { Component, Prop, State } from "@stencil/core";
import { LanguageService } from '../../services/language';

@Component({
  tag: "app-home",
  styleUrl: "app-home.scss"
})
export class AppHome {

  @Prop()
  language: LanguageService;
  @State()
  home: {
    title?: string;
    titlesubText?: string
    introButtonOne?: string;
    introButtonTwo?: string;
    mainParagraphOne?: string;
    mainHeadlineOne?: string;
    mainParagraphTwo?: string;
    mainHeadlineTwo?: string;
    mainParagraphThree?: string;    
  } = {};
  async componentDidLoad() {
    this.home = await this.language.get('home');
  }

  render() {
    return [
      <app-header />,
      <ion-content>
        <div class="header-content">
          <h1>{this.home.title}</h1>
          <p class="header-p">{this.home.titlesubText}</p>
          <ion-button href="/login">{this.home.introButtonOne}</ion-button>
          <ion-button href="/login">{this.home.introButtonTwo}</ion-button>        
        </div>

        <ion-card>

          <p>
            {this.home.mainParagraphOne}
          </p>
          <ion-title>{this.home.mainHeadlineOne}</ion-title>
          <p>{this.home.mainParagraphTwo}</p>
          <ion-title>{this.home.mainHeadlineTwo}</ion-title>
          <p>{this.home.mainParagraphThree}</p>
        </ion-card>
      </ion-content>
    ];
  }
}
