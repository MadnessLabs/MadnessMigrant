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
  tag: 'migrant-chat',
  styleUrl: 'migrant-chat.scss'
})
export class MigrantChat {
  @Element()
  migrantChatEl: HTMLInputElement;

  @Event()
  addMessage: EventEmitter;

  @Prop()
  language: LanguageService;
  @Prop()
  user: any;

  @State()
  newMsgs = [
    {
      name: 'Dave Davids',
      photo:
        'https://i.kym-cdn.com/entries/icons/original/000/017/517/images_(1).jpg',
      timestamp: 'asdf',
      message: 'messages!',
      read: false,
      me: true
    },
    {
      name: 'Jim Bob',
      photo:
        'https://pre00.deviantart.net/7dde/th/pre/i/2013/347/6/3/paper_zelda_for_squeggonic_by_fangirlofartsyness-d6g0aof.png',
      timestamp: 'asdf',
      message: 'messages even more and more messages!',
      read: false,
      me: false
    }
  ];
  @State()
  historyMsgs = [];
  @State()
  sendChatEl: any;

  sendMsg(event) {
    console.log('this is loggin');

    console.log(this.sendChatEl[0].value);

    event.preventDefault();
    this.addMessage.emit({
      event,
      data: {
        message: this.sendChatEl[0].value
      }
    });
  }

  componentDidLoad() {
    this.sendChatEl = this.migrantChatEl.getElementsByClassName(
      'send-msg-input'
    );
  }
  render() {
    return [
      <app-header
        language={this.language.currentLanguage}
        photo={this.user.photo}
      />,
      <ion-content scrollEvents={true}>
        <ion-card>
          <ion-list>
            {this.newMsgs.map(msg => (
              <migrant-message newMessage={msg} />
            ))}
          </ion-list>
          <ion-list>
            <ion-item class="enter-msg">
              <ion-input
                class="send-msg-input"
                placeholder="write your message..."
              />
              <ion-icon
                class="send-msg"
                name="paper-plane"
                onClick={event => this.sendMsg(event)}
              />
            </ion-item>
          </ion-list>
        </ion-card>
      </ion-content>
    ];
  }
}
