import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { NbChatModule } from '@nebular/theme'
import { NbCardModule } from '@nebular/theme'
import { NbDialogModule } from '@nebular/theme'
import { NbInputModule } from '@nebular/theme'
import { NbUserModule } from '@nebular/theme'
import { NbToastrModule } from '@nebular/theme'

// import { ImageDrawingModule } from 'ngx-image-drawing';

import { UsernameComponent } from './username/username.component'
import { WhiteboardComponent } from './whiteboard/whiteboard.component'

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    UsernameComponent,
    WhiteboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbChatModule,
    NbCardModule,
    NbInputModule,
    NbUserModule,
    NbToastrModule.forRoot(),
    // ImageDrawingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
