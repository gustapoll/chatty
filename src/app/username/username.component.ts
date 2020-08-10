import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent {

  username: String;

  constructor(protected ref: NbDialogRef<UsernameComponent>) {}

  onSubmit() {
    this.ref.close(this.username);
  }
}
