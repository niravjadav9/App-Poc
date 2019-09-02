import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  $auth = new BehaviorSubject(this.checkLogin());

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };


  constructor(private _router: Router, private _http: HttpClient) { }

  signUp(user) {
    return this._http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this._http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this._http.get(environment.apiBaseUrl + '/userProfile');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      // console.log(userPayload);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  checkLogin() {
    var userPayload = this.getUserPayload();
    
    if (userPayload){
    console.log(userPayload.exp> Date.now() / 1000);
      return userPayload.exp > Date.now() / 1000;}
    else
      return false;
  }

  logOut() {
    this.deleteToken();
    this.$auth.next(false);
    this._router.navigate(['/login']);
  }


}






  // -LOCAL-STORAGE-

  // signIn(data) {

  //   let logUser: any = JSON.parse(localStorage.getItem('Users'));

  //   for (var i = 0; i < logUser.length; i++) {
  //     if (data.email === logUser[i].email && data.password === logUser[i].password) {
  //       localStorage.setItem("isLoggedIn", "true");
  //       this.$auth.next(this.checkLogin());
  //       this._router.navigate(['home']);
  //       break;
  //     }
  //   }
  //   if ((i) === logUser.length) {
  //     alert("please try again");
  //   }
  // }

  // signUp(data) {
  //   let userDetails: any = localStorage.getItem("Users");
  //   if (userDetails) {
  //     userArray = JSON.parse(userDetails);
  //   } else {
  //     var userArray = [];
  //   }
  //   userArray.push(data);
  //   localStorage.setItem("Users", JSON.stringify(userArray));
  //   this._router.navigate(['login']);
  // }

