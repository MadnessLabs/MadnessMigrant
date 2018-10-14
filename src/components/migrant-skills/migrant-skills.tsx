import {
  Component,
  Event,
  Element,
  EventEmitter,
  Listen,
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
  migrantSkillsEvent: EventEmitter;

  @State()
  searchEl: any;
  @State()
  skills: any = [
    'skillA',
    'skillB',
    'skillC',
    'skillD',
    'skillBee',
    'skillOKAY'
  ];
  @State()
  shownSkills: any;
  @State()
  selectedSkills: any = ['skillB'];

  componentWillLoad() {
    this.shownSkills = this.skills;
  }

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
    this.migrantSkillsEvent.emit({ data: this.selectedSkills });
  }
  @Listen('ionChange')
  filterList() {
    this.shownSkills = [];
    this.skills.forEach(skill => {
      if (skill.includes(this.searchEl[0].value)) {
        this.shownSkills = [...this.shownSkills, skill];
      }
      if (this.searchEl.length === 0) {
        this.shownSkills = this.skills;
      }
    });
  }

  render() {
    return (
      <div class="skills">
        <ion-searchbar class="search-skills" />

        <ion-list>
          {this.shownSkills.map(skill => (
            <ion-item
              class={
                this.selectedSkills.indexOf(skill) !== -1 ? 'is-checked' : null
              }
              onClick={event => this.addSelectedSkills(event, skill)}
            >
              <ion-icon
                name={
                  this.selectedSkills.indexOf(skill) !== -1
                    ? 'checkbox'
                    : 'checkbox-outline'
                }
              />
              <p>{skill}</p>
            </ion-item>
          ))}
        </ion-list>
      </div>
    );
  }
}
