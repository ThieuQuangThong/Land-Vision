import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  Observable,
  catchError,
  switchMap,
  throwError
} from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { StorageService } from '../_service/storage.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router,
    private store: StorageService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.getAccessToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401 && token!= null ) {
          return this.authService.refreshToken().pipe(
            switchMap((newToken: string) => {
              this.authService.setToken(newToken);
              this.store.setToken(newToken);

              this.authService.setUserProfileByToken(newToken);
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(request);
            }),
            catchError(error => {
              this.authService.logout();
              return throwError(error);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
