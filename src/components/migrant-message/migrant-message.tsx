import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'migrant-message',
    styleUrl: 'migrant-message.scss'
})
export class MigrantMessage {

    @Prop() newMessage : any;

    render() {
        return (
            <div>
                <ion-list>
                    <ion-item>
                        {
                            this.newMessage.me 
                            ? <div class="me-msg msg-bubble" slot="start">
                                <span><img src={this.newMessage.photo} /></span>
                                <br/>
                                <span> {this.newMessage.message}</span>
                            </div> 
                            : 
                            <div slot="end" class="them-msg msg-bubble">
                            <span class="img-span"><img src={this.newMessage.photo} alt=""/></span>
                            <br/>
                            <span> {this.newMessage.message}</span>
                            </div>
                        }
                        
                    </ion-item>
                </ion-list>
            </div>
        );
    }
}
