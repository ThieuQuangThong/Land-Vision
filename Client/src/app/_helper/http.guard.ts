
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
import { JwtHelperService } from '@auth0/angular-jwt';
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,private auth: AuthService, private router: Router, private storage: StorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot


  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      const requiredRoles = route.data['requiredRole'];
      const token = this.storage.getAccessToken();

          if (token) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            const role = decodedToken.role
            if (requiredRoles) {
              const requiredRoleList = requiredRoles.split(",")

              if (requiredRoleList.includes(role)) {
                return true;
              }
              else {
                if (role == PROPERTY_INFOR.Role.admin)
                  this.router.navigate(['/admin'])
                if (role == PROPERTY_INFOR.Role.user)
                  this.router.navigate(['/landing'])
                return false;
              }
            }
            return true
            // logged in so return true
          } else {

            this.router.navigate(['/landing']);
            return false;
          }

  }
}
