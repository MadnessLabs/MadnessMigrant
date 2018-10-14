import { Component } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.scss"
})
export class AppHome {
  render() {
    return [
      <app-header />,
      <ion-content>
        <div class="header-content">
          <h1>Migrating to America Made Easy</h1>
          <p class="header-p">Are you a:</p>
          <ion-button href="/login">mentor</ion-button>
          <ion-button href="/login">immigrant</ion-button>        
        </div>

        <ion-card>

          <p>
            Madness Migrant was inspired by people and having the trust factor
            included in the app. We really wanted foreigners to have a great
            experience, but also be crucially helpful to them. Whether it was
            their mentor supporting them in their journey or helping them to
            network in their communities, everything they would need to become a
            successful and consistent member in the USA.
          </p>
          <ion-title>What's the big deal?</ion-title>
          <p>
            Madness Migrant connects mentors with men-tees of similar
            experiences, matching their skill sets and goals, these users are
            able to connect, share resources, chat, listen in their language,
            and get support from their fellow man.
          </p>
          <ion-title>What's Next?</ion-title>
          <p>
            Madness Migrant is extremely scalable, with that said, below is a
            list of features we think would be super beneficial: 1. Being able
            to book in person meetings and video calls with a mentees' mentor.
            2. Adding the availability of a mentor's schedule. 3. Seeing
            profiles of both the mentor and mentee on each others' dashboard. 4.
            Time that a mentor has spent generally with all mentees as well as
            individually. 5. Advancements the mentors have been able to help
            their mentees achieve. 6. Having a review system on mentors. 7.
            Allowing mentors to become sponsors. 8. Listing mentee sponsors on
            their dashboard. 9. Listing obtainable job listings/opportunities on
            the mentee's dashboard. 10. Creating an immigration path for
            foreigners with the ecosystem believed to be the most helpful for
            integrating them into the US. 11. Creating the steps to a unified
            database.
          </p>
        </ion-card>
      </ion-content>
    ];
  }
}
