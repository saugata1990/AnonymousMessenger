import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.css']
})
export class PostMessageComponent implements OnInit {

  messageSuccess: boolean;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.messageSuccess = false;
  }

  onPostMessage(message) {
    this._userService.post_message(message)
    .subscribe(
      data => this.messageSuccess = true
    );
  }

}
