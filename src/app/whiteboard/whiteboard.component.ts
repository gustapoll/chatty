import { Component, OnInit } from '@angular/core';
import { WhiteboardService } from '../whiteboard.service';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent implements OnInit {

  constructor(protected drawingService: WhiteboardService) {
    this.canvas.addEventListener('mousedown', this.onMouseDown, false);
    this.canvas.addEventListener('mouseup', this.onMouseUp, false);
    this.canvas.addEventListener('mouseout', this.onMouseUp, false);
    this.canvas.addEventListener('mousemove', this.throttle(this.onMouseMove, 10), false);
    
    //Touch support for mobile devices
    this.canvas.addEventListener('touchstart', this.onMouseDown, false);
    this.canvas.addEventListener('touchend', this.onMouseUp, false);
    this.canvas.addEventListener('touchcancel', this.onMouseUp, false);
    this.canvas.addEventListener('touchmove', this.throttle(this.onMouseMove, 10), false);

    for (let i = 0; i < this.colors.length; i++){
      this.colors[i].addEventListener('click', this.onColorUpdate, false);
    }

    window.addEventListener('resize', this.onResize, false);
    this.onResize();

    this.drawingService.onDrawing().subscribe(this.onDrawingEvent)
  }

  ngOnInit(): void {}


  canvas = <HTMLCanvasElement> document.getElementsByClassName('whiteboard')[0];
  colors = document.getElementsByClassName('color');
  context = this.canvas.getContext('2d');

  current = {
    color: 'black',
    x: 0,
    y: 0
  }

  drawing = false

  // socket.on('drawing', onDrawingEvent);


  drawLine(x0, y0, x1, y1, color, emit?){

    console.log("AAAAAAAA")

    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();

    if (!emit) { return; }
    let w = this.canvas.width;
    let h = this.canvas.height;

    // socket.emit('drawing', {
    //   x0: x0 / w,
    //   y0: y0 / h,
    //   x1: x1 / w,
    //   y1: y1 / h,
    //   color: color
    // });

    this.drawingService.draw({
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

  onMouseDown(e){
    this.drawing = true;
    this.current.x = e.clientX||e.touches[0].clientX;
    this.current.y = e.clientY||e.touches[0].clientY;
  }

  onMouseUp(e){
    if (!this.drawing) { return; }
    this.drawing = false;
    this.drawLine(this.current.x, this.current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, this.current.color, true);
  }

  onMouseMove(e){
    if (!this.drawing) { return; }
    this.drawLine(this.current.x, this.current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, this.current.color, true);
    this.current.x = e.clientX||e.touches[0].clientX;
    this.current.y = e.clientY||e.touches[0].clientY;
  }

  onColorUpdate(e){
    this.current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  throttle(callback, delay) {
    let previousCall = new Date().getTime();
    return function() {
      let time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  onDrawingEvent(data){
    let w = this.canvas.width;
    let h = this.canvas.height;
    this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  // make the this.canvas fill its parent
  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
}
