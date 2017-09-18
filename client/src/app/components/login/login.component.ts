import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  loginSuccess: boolean;
  targetValid: boolean;

  constructor(private _userService: UserService, private router: Router) {
    this.loginSuccess = true;
    this.targetValid = true;
  }

  ngOnInit() {
    if (sessionStorage.getItem('current_user') !== null) {
      this.router.navigate([JSON.parse(sessionStorage.getItem('current_user')).user_id + '/messages']);
    }
  }

  // tslint:disable-next-line:one-line
  onLogin(user_id, password){
    this._userService.login(user_id, password)
    .subscribe(
      data => {

        this.loginSuccess = true;
        data = JSON.stringify(data);
        // tslint:disable-next-line:curly
        if (data != null)
          sessionStorage.setItem('current_user', data);
        // this.onGetUser(data); will use user_id in session storage in the future

        this.router.navigate([user_id + '/messages']);
      },
      error => {
        console.log('Error occured');
        this.loginSuccess = false;
      },
      () => console.log('finished')
    );

  }

  validateTarget(userid) {
    this._userService.search_user(userid)
    .subscribe(
      data => {

        this.targetValid = true;
        sessionStorage.setItem('target_user', userid);
        this.router.navigate([userid + '/message']);
      } ,
      err => {
        this.targetValid = false;
        console.log(err);
      }
    );
  }

}
