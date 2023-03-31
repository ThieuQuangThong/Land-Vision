import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenModel } from './token.model';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public deleteToken(): boolean {
    try {
      if (localStorage.getItem(TOKEN)) {
        localStorage.removeItem(TOKEN);
      }
      return true;
    } catch {}
    return false;
  }

  public setToken(token: TokenModel): boolean {
    try {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, JSON.stringify(token));
      return true;
    } catch {
      return false;
    }
  }

  public getToken(): TokenModel | null {
    const tokenLocalStorage = localStorage.getItem(TOKEN);
    if (tokenLocalStorage) {
      let token = JSON.parse(tokenLocalStorage) as TokenModel;
      return token;
    }
    return null;
  }

  public getAccessToken(): string {
    const tokenLocalStorage = localStorage.getItem(TOKEN);
    if (tokenLocalStorage) {
      let token = JSON.parse(tokenLocalStorage) as TokenModel;
      return token.accessToken;
    }
    return '';
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      return true;
    }
    return false;
  }
}
