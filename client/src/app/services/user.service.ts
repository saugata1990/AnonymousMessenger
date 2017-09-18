import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {


  private login_url = 'http://localhost:3000/login';
  private logout_url = 'http://localhost:3000/login/user/logout';
  private signup_url = 'http://localhost:3000/signup';

  public userSubject = new BehaviorSubject<any>(null);

  constructor(private _http: Http) { }

  // functions  defined for get and post requests from frontend to node server
  // tslint:disable-next-line:one-line
  login(userid, password){
    const params = {user_id: userid, password: password};
    return this._http.post(this.login_url, params)
    .map(res => {
      return res.json();
    });
  }

  logout(userid) {
    return this._http.post(this.logout_url, {user_id: userid});
  }

  create_user(name, userid, password) {
    return this._http.post(this.signup_url, {name: name, user_id: userid, password: password});
  }

  search_user(user_id) {
    return this._http.get('search/' + user_id);
  }


  post_message(message) {
    const userid = sessionStorage.getItem('target_user');
    return this._http.post(userid + '/messages', {message: message});
  }

  /* // tslint:disable-next-line:one-line
        this function will be used for accessing messages after user has logged in...
  getCurrentUser(data){
    this.userSubject.next(data);
  } */


}
