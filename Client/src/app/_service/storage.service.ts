import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private router: Router) {}

  public deleteToken(): boolean {
    try {
      if (localStorage.getItem(TOKEN)) {
        localStorage.removeItem(TOKEN);
      }
      return true;
    } catch {}
    return false;
  }

  public setToken(token: string): boolean {
    try {
      localStorage.removeItem(TOKEN);
      localStorage.setItem(TOKEN, token);
      return true;
    } catch {
      return false;
    }
  }


  public getAccessToken(): string | null{
    const tokenLocalStorage = localStorage.getItem(TOKEN);
    if (tokenLocalStorage) {
      return tokenLocalStorage;
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      return true;
    }
    return false;
  }
}
