import { Component, Prop } from '@stencil/core';
import { LanguageService } from '../../services/language';

@Component({
  tag: 'modal-language',
  styleUrl: 'modal-language.css'
})
export class ModalLanguage {
  @Prop()
  language: LanguageService;

  render() {
    return (
      <ion-content>
        <migrant-language language={this.language} />
      </ion-content>
    );
  }
}
