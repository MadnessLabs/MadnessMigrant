import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  State
} from '@stencil/core';
import { LanguageService } from '../../services/language';

@Component({
  tag: 'migrant-language',
  styleUrl: 'migrant-language.scss'
})
export class MigrantLanguage {
  @Element()
  languageEl: HTMLMigrantLanguageElement;

  @Event()
  migrantSetLanguage: EventEmitter;

  @Prop()
  language: LanguageService;

  @State()
  availableLanguages: {
    name: string;
    code: string;
  }[] = [];

  async componentDidLoad() {
    this.availableLanguages = await this.language.list();
  }

  async setLanguage(language: string) {
    await this.language.setLanguage(language);
    this.migrantSetLanguage.emit({ language });
    this.languageEl.forceUpdate();
  }

  render() {
    return (
      <ion-grid>
        <ion-row>
          {this.availableLanguages.map(language => (
            <ion-col onClick={() => this.setLanguage(language.code)}>
              <div
                class={
                  this.language.currentLanguage === language.code
                    ? 'flag active'
                    : 'flag'
                }
                style={{
                  backgroundImage: `url('./assets/flags/${language.code}.png')`
                }}
              >
                {this.language.currentLanguage === language.code ? (
                  <ion-icon name="checkmark-circle" />
                ) : null}
              </div>
              <b>{language.name}</b>
            </ion-col>
          ))}
        </ion-row>
      </ion-grid>
    );
  }
}
