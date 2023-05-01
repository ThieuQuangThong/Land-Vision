
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { StorageService } from '../_service/storage.service';
import { User } from '../_service/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  jwtService: JwtHelperService = new JwtHelperService();
  // constructor(private auth: AuthService, private router: Router, private storage: StorageService) {}

  constructor(private router: Router, private storage: StorageService) {}

  canActivate() {
    var token = this.storage.isLoggedIn();
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (token) {
      // Nếu đã đăng nhập thì cho phép truy cập vào trang
      return true
    }

    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    this.router.navigate(['/login']);
    return false;
  }

}
