import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userCreated: boolean;
  attempted: boolean;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.userCreated = false;
    this.attempted = false;
  }

  onSignup(name, id, password) {
    // add sanity check
    this._userService.create_user(name, id, password)
    .subscribe(
      data => {
        this.userCreated = true;
        setTimeout( () => {
          this._router.navigate(['']);
        }, 1000);
      } ,
      err => {
        this.userCreated = false;
        this.attempted = true;
      }
    );
  }

}
