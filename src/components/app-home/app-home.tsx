import { Component } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {
  render() {
    return [
      <app-header />,
      <ion-content>
        <p>Hello AppHome!</p>
      </ion-content>
    ];
  }
}
