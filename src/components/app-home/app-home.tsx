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
        <ion-card>
          <h1>Madness Migrant, Migrating to America made Easy</h1>
          <p>
            Madness Migrant was inspired by people and having the trust factor
            included in the app. We really wanted foreigners to have a great
            experience, but also be crucially helpful to them. Whether it was
            their mentor supporting them in their journey or helping them to
            network in their communities, everything they would need to become a
            successful and consistent member in the USA.
          </p>
          <h2>What's the big deal?</h2>
          <p>
            Madness Migrant connects mentors with men-tees of similar
            experiences, matching their skill sets and goals, these users are
            able to connect, share resources, chat, listen in their language,
            and get support from their fellow man.
          </p>
          <h2>What's Next?</h2>
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
          <ion-slides pager={true}>
            <ion-slide>
              <ion-grid>
                <ion-row>
                  <ion-col size="12">
                    <h1>Our Accomplishments</h1>
                  </ion-col>
                  <ion-col size="12">
                    <ion-list>
                      <ion-item>
                        1. Building an app in 24 hours with cutting edge
                        technology
                      </ion-item>
                      <ion-item>2. Our text-to-speech in 3 languages</ion-item>
                      <ion-item>3. The theme is one of our best</ion-item>
                      <ion-item>
                        4. Taking so much information and trying to boil down
                        the biggest main problems
                      </ion-item>
                      <ion-item>
                        5. Making the app people-centric and user friendly
                      </ion-item>
                    </ion-list>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-slide>

            <ion-slide>
              <ion-grid>
                <ion-row>
                  <ion-col size="12">
                    <h1>How We Built</h1>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12">
                    <p>
                      Our stack includes StencilJs, HTML5, CSS3/SASS, JS, Google
                      Firebase; Component driven.
                    </p>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-slide>

            <ion-slide>
              <h1>Our Challenges</h1>
              <p>
                1. Fitting our best ideas into a Very small MVP, we have so many
                more features we would have loved to share. 2. We also didn't
                study up on anything before we came because we thought there was
                going to be one specific problem we'd be solving with copious
                amounts of information, though we found out there are so many
                problems that the panel couldn't even cover all of them, so
                perhaps, research was a big set back for us. 3. Time obviously,
                building an app in one day is a pretty hefty undertaking, even
                for a four page app/website.
              </p>
            </ion-slide>

            <ion-slide>
              <h1>Our Lessons Learned</h1>
              <p>
                1. To study first 2. How many hardships in immigration there are
                and a sense of what it means to integrate into another country.
                3. More team building skills
              </p>
            </ion-slide>
          </ion-slides>
        </ion-card>
      </ion-content>
    ];
  }
}
