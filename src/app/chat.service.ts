import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class ChatService {
 
    constructor(private socket: Socket) { }
 
    joinChat(username: String){
      this.socket.emit("joined", username);
    }

    getNewUser() {
      return this.socket
        .fromEvent("joined")
        .pipe(map((data: any) => data));
    }

    getLeftChatUser() {
      return this.socket
        .fromEvent("left")
        .pipe(map((data: any) => data));
    }

    sendMessage(msg: any){
        this.socket.emit("message", msg);
    }
    
    getMessage() {
         return this.socket
             .fromEvent("message")
             .pipe(map((data: any) => data));
    }
}