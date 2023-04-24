import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { TokenModel } from '../_service/token.model';
import { User } from '../_service/user.model';
import { Token } from '@angular/compiler';
import { StorageService } from '../_service/storage.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router,
    private store: StorageService,
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    if(req.url.indexOf('login') > 0 || req.url.indexOf('token/refresh') > 0){
      return next.handle(req);
    }

    var accessToken = this.store.getAccessToken();
    var isTokenExpired = this.jwtHelper.isTokenExpired(accessToken);
    if(isTokenExpired == false)
    {
      return next.handle(this.addTokenHeader(req, accessToken));
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        if (error.status === 401) {
          this.router.navigate(['login']);
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      })
    );
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    var result = this.authService.checkAccessTokenAndRefresh();
    this.refreshTokenSubject.next(null);

    if(result.status){
      this.refreshTokenSubject.next(result.token);
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeader(request, token)))
      );
    }
    return of();
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `bearer ${token}`),
    });
  }
}
