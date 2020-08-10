import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { NbDialogService } from '@nebular/theme';
import { UsernameComponent } from './username/username.component'

import { NbToastrService, NbComponentStatus, NbIconConfig } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
    }
  `],
})
export class AppComponent implements OnInit {
  title = 'chatty';

  username = "John Doe"

  messages: any[] = [];

  constructor(protected dialogService: NbDialogService, protected toastrService: NbToastrService, protected chatService: ChatService) {    
    this.chatService.getNewUser().subscribe(user => {

      let reply = user == this.username

      if (!reply){
        let iconConfig: NbIconConfig = { status: 'success', icon: 'person-add-outline', pack: 'eva' };
        this.toastrService.show(user, `User Joined Chat`, iconConfig);  
      }
    })
    
    this.chatService.getMessage().subscribe(response => {

      let reply = response.user.name == this.username

      if (!reply){
        // if other user sent message -> show notification 
        let status: NbComponentStatus = 'primary'
        let user = response.user.name
        this.toastrService.show(user, `1+ New message`, { status });  
      }

      // weird -> not functional :sad-panda:
      response.reply = reply

      this.messages.push(response)
    })

    this.chatService.getLeftChatUser().subscribe(user => {

      if (user){
        // if user is not anonymous
        let iconConfig: NbIconConfig = { status: 'danger', icon: 'person-remove-outline', pack: 'eva' };
        this.toastrService.show(user, `User Left Chat`, iconConfig);  
      }
    })
  }

  ngOnInit() {
    this.dialogService.open(UsernameComponent, { closeOnBackdropClick: false })
      .onClose.subscribe(name => {

        this.username = name

        this.chatService.joinChat(name)

        this.toastrService.show(name, `Welcome to Chatty!`, { status: 'success' });  
      });
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    let reponse = {
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: this.username,
        avatar: 'https://i.gifer.com/no.gif',
      },
    };

    this.chatService.sendMessage(reponse)
  }
}
