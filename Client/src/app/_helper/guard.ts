import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from '../_service/storage.service';

@Injectable()
export class AuthGuard2 implements CanActivate {

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
