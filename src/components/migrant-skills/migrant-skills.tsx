import {
  Component,
  Event,
  Element,
  EventEmitter,
  Listen,
  Prop,
  State
} from '@stencil/core';

@Component({
  tag: 'migrant-skills',
  styleUrl: 'migrant-skills.scss'
})
export class MigrantSkills {
  @Element()
  appHomeEl: HTMLMigrantSkillsElement;

  @Event()
  ionChange: EventEmitter;

  @Prop()
  skills: any;

  @State()
  searchEl: any;
  @State()
  selectedSkills: any = ['skillB'];
  @State()
  searchTerms: string;

  componentDidLoad() {
    this.searchEl = this.appHomeEl.getElementsByClassName('search-skills');
  }

  addSelectedSkills(event, skill) {
    event.preventDefault();
    if (this.selectedSkills.indexOf(skill) === -1) {
      this.selectedSkills = [...this.selectedSkills, skill];
    } else {
      this.selectedSkills.splice(this.selectedSkills.indexOf(skill), 1);
      this.selectedSkills = [...this.selectedSkills];
    }
    this.sendSkills();
  }
  sendSkills() {
    this.ionChange.emit({ data: this.selectedSkills });
  }

  @Listen('ionChange')
  onIonChange(event) {
    this.searchTerms = event.detail.value;
  }

  render() {
    return (
      <div class="skills">
        <ion-searchbar class="search-skills" />
        <ion-list>
          {this.skills
            ? Object.keys(this.skills).map(skill => (
                <ion-item
                  class={
                    this.selectedSkills.indexOf(skill) !== -1
                      ? 'is-checked'
                      : null
                  }
                  onClick={event => this.addSelectedSkills(event, skill)}
                >
                  <ion-icon
                    slot="start"
                    name={
                      this.selectedSkills.indexOf(skill) !== -1
                        ? 'checkbox'
                        : 'checkbox-outline'
                    }
                  />
                  <ion-label>{this.skills[skill]}</ion-label>
                </ion-item>
              ))
            : null}
        </ion-list>
      </div>
    );
  }
}
