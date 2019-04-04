import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  //private _refreshNeeded = new Subject<void>();

  @Output() public loggedUser = new EventEmitter<User>();

  constructor(private httpClient: HttpClient) { }

  // Http Requests
  // Add New User
  addUser(body) {
    return this.httpClient.post(environment.apiUserUrl + '/addUser', body, this.noAuthHeader);
  }

  // Login
  login(authCredentials) {
    console.log(environment.apiUserUrl);
    console.log(JSON.stringify(authCredentials));
    console.log(this.noAuthHeader);
    return this.httpClient.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
  }

  // Get the User List from User collections 
  getUserList() {
    return this.httpClient.get(environment.apiUserUrl + '/userlist');
  }

  getUserProfile() {
    return this.httpClient.get(environment.apiUserUrl + '/userProfile')
      .pipe(
        tap((data) => {
          this.loggedUser.emit(data['user']);
        })
      );
  }

  getUser(userId: string) {
    return this.httpClient.get(environment.apiUserUrl + '/user/' + userId);
  }

  updateUserDet(userId: string, body: any) {
    console.log("updateUserDet - Inside");
    return this.httpClient.post(environment.apiUserUrl + '/updateUser/' + userId, body);
  }

  deleteUserDet(userId: string) {
    console.log("updateUserDet - Inside");
    return this.httpClient.delete(environment.apiUserUrl + '/deleteUser/' + userId);
  }


  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 10000;
    else
      return null;
  }


}
