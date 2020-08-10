import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WhiteboardService {

  constructor(private socket: Socket) { }

  onDrawing(){
    return this.socket
        .fromEvent("drawing")
        .pipe(map((data: any) => data));
  }

  draw(coordinates){
    this.socket.emit('drawing', coordinates);
  }
}
