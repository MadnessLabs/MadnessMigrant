import { Component, State } from '@stencil/core';


@Component({
	tag: 'migrant-skills',
	styleUrl: 'migrant-skills.css'
})
export class MigrantSkills {

	@State() skills: any = ['skillA', 'skillB', 'skillC', 'skillD', 'skillBee', 'skillOKAY'];
	@State() selectedSkills: any = ['skillB'];

	sendSkills(event) {
		event.preventDefault();
	}

	addSelectedSkills(event, skill) {
		console.log(event);
		console.log('in add selected skills!');
		
		if (this.selectedSkills.indexOf(skill) === -1)  {
			this.selectedSkills = [...this.selectedSkills, skill]
		} else {
			this.selectedSkills.splice( this.selectedSkills.indexOf(skill), 1);
			this.selectedSkills = [...this.selectedSkills];
		}

		console.log(this.selectedSkills.indexOf(skill));
		
		console.log(this.selectedSkills);
		
	}

	render() {
		return (
			<div class="skills">
			<p>asdf</p>
				<ion-searchbar></ion-searchbar>

				<ion-list>
					{
						this.skills.map( skill => 
							<ion-item>
								<ion-icon name={this.selectedSkills.indexOf(skill) != -1 ? "checkbox-outline" : "checkbox"} onClick={(event) => this.addSelectedSkills(event, skill)}></ion-icon>
								<p>skill: {skill}</p>
							</ion-item>
						)
					}
				</ion-list>
				<ion-button onClick={(event) => this.sendSkills(event)} >submit</ion-button>
			</div>
		);
	}
}
