import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { SignUpRequest } from '../SignUpRequest';

export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticaterUser'
export const AUTHENTICATED_USERNAME = 'authenticaterUserName'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  executeAuthenticationService(username: string, password: string) {
    
    return this.http.post<any>(
      `${API_URL}/accounts/login`,'{ "username":"'+ username + '" , "password": "'+password+'" }').pipe(  
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USERNAME, username)
            sessionStorage.setItem(AUTHENTICATED_USER, data);
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
          }
        )
      );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedUserName() {
    return sessionStorage.getItem(AUTHENTICATED_USERNAME)
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }

  executeSignUpService(signUpRequest: SignUpRequest) {
    return this.http.post<SignUpRequest>(
      `${API_URL}/accounts/register`,signUpRequest);
  }
}