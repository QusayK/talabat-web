import { Injectable } from '@angular/core';

const TOKEN_KEY = 'x-token';
const USER_KEY = 'x-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  logOut() {
    window.sessionStorage.clear();
  }

  saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(window.sessionStorage.getItem(USER_KEY));
  }
}
