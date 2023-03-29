import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { TokenModel } from './token.model';
import { LoginComponent } from '../login/login.component';
import { StorageService } from './storage.service';
import { User } from './user.model';
import { API_URL } from '../apiurl';
import { Router } from '@angular/router';
HttpClient;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient, private storage: StorageService, private jwtHelper: JwtHelperService, private router: Router) {}
  userProfile = new BehaviorSubject<User | null>(null);

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post('https://localhost:7165/api/Account/login', body,{responseType: 'text'}
    )
    .pipe(
      tap((response) => {
        const token:TokenModel = new TokenModel()
        token.accessToken = response
        this.storage.setToken(token);
        var userInfo = this.jwtService.decodeToken(token.accessToken) as User;
        this.userProfile.next(userInfo);
        return true;
      }),
      catchError((error) => {
        error.
        this.toast.error({detail: "Error Message", summary:" Please check your email or password again!", duration: 5000})
        return of(false);
      }),
    );

  }





  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }
  refreshToken(login: TokenModel) {
    return this.http.post<TokenModel>(
      'https://localhost:44380/api/Token/Refresh',
      login
    );
  }

  logout(): void {
    // Xóa thông tin người dùng khỏi localStorage hoặc sessionStorage khi đăng xuất
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Kiểm tra xem có thông tin người dùng nào được lưu trữ trong localStorage hoặc sessionStorage hay không
    if (this.getLoggedInUser() == null) return false;
    return true;
  }

  getLoggedInUser(): any {
    // Lấy thông tin người dùng đã đăng nhập từ localStorage hoặc sessionStorage
    var token = localStorage.getItem('token');
    if (token) {
      var tokenModel = JSON.parse(token) as TokenModel;
      var userInfo = this.jwtService.decodeToken(
        tokenModel.accessToken
      )
    }
    return null;
  }

  public checkAccessTokenAndRefresh(): {status : "", token: ""} {
    const localStorageTokens = localStorage.getItem('token');
    var check = true;
    if (localStorageTokens) {
      var token = JSON.parse(localStorageTokens) as TokenModel;
      var isTokenExpired = this.jwtHelper.isTokenExpired(token.accessToken);
      if(isTokenExpired){
        this.refreshToken(token).subscribe(
          (tokenNew: TokenModel) => {
            localStorage.setItem('token', JSON.stringify(tokenNew));
            return Object({
              status : check,
              token : tokenNew,
            });
          },
          err => {
            this.logout();
            check = false;
          }
        );
      }
    }else{
      check = false;
    }
    return Object({
      status : check,
    });
  }

}

