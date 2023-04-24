import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { TokenModel } from './token.model';
import { LoginComponent } from '../login/login.component';
import { StorageService } from './storage.service';
import { User, UserInfor } from './user.model';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { API_URL } from 'src/assets/API_URL';
import jwt_decode from "jwt-decode";

HttpClient;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtService: JwtHelperService = new JwtHelperService();
  public  code: any;
  private token!: string;
  data = {email: '', code: ''};
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public email: any;
  constructor(private http: HttpClient, private storage: StorageService, private jwtHelper: JwtHelperService, private router: Router) { }
  userProfile = new BehaviorSubject<User | null>(null);

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password,
    };
    return this.http.post(API_URL.LOGIN(), body, { responseType: 'text', withCredentials: true }
    )
      .pipe(
        tap((response) => {
          const token: TokenModel = new TokenModel()
          token.accessToken = response
          this.storage.setToken(token);
          var userInfo = this.jwtService.decodeToken(token.accessToken) as User;

          this.userProfile.next(userInfo);
          return true;
        }),
        catchError((error) => {
          console.log(error);

          const errorObject = JSON.parse(error.error);
          const errorMessage = errorObject.detail;
          AlertService.setAlertModel('danger',errorMessage)
          error.
          this.toast.error({ detail: "Error Message", summary: " Please check your email or password again!", duration: 5000 })
          return of(false);
        }),
      );

  }
  getToken(): string {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('token');
    const url = 'https://localhost:7165/api/Account/refresh';
    return this.http.post<string>(url, { refreshToken });
  }


  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/verify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  getTokenInformation() {
    const token = localStorage.getItem('token');

    if(!token){
      return "";
    }
    const payloadBase64 = JSON.parse(token).accessToken.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payloadObject = JSON.parse(payloadJson);

    return payloadObject

  }

  getUserId():number {
    return this.getTokenInformation().nameid;
  }

  getUserInforById(userId: number): Observable<UserInfor>{
    return this.http.get<UserInfor>(API_URL.GET_USER_BY_ID(userId));
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



  forgotPassword(email: string): Observable<any> {
    const url = API_URL.FORGOT_PASSWORD(email);
    return this.http.post(url,{}, {withCredentials: true });
  }

  getData(email: any, code: string) {
    const data = {
      email: email,
      code: code
    };
    const url = API_URL.VALIDATE_CODE();
    return this.http.post(url, data).subscribe((response: any) => {
      console.log(response);
      alert("ok")
      this.router.navigate(['new-password/'+this.code])

    });
  }

  getDataCode(email: any, code: any) {
    const data = {
      email: email,
      code: code
    };
    const url = API_URL.VALIDATE_CODE();
    return this.http.post(url, data).subscribe((response: any) => {
      console.log(response);
      alert("ok")
      this.router.navigate(['new-password/'+this.code])
    });
  }

}

