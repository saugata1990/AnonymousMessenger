import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: []
})
export class MessagesComponent implements OnInit {

  user_name: string;
  messages: string[];
  user_id: string;


  constructor(private _userService: UserService, private _router: Router) {

   }

  ngOnInit() {

    if (sessionStorage.getItem('current_user') == null) {

      this._router.navigate(['/invalid-route']);
    } else  {
      this.user_id = JSON.parse(sessionStorage.getItem('current_user')).user_id;

      if ( this._router.url !== '/' + this.user_id + '/messages') {
        this._router.navigate(['/invalid-route']);
      } else {
        this.user_name = JSON.parse(sessionStorage.getItem('current_user')).name;
        this.messages = JSON.parse(sessionStorage.getItem('current_user')).messages;
      }
    }
  }

  onLogout() {
    this._userService.logout(this.user_id).subscribe();
    sessionStorage.clear();
    this._router.navigate(['']);
  }

}
