import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/main-services/auth.service';
import { IUser } from './../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _account: AuthService,private _toastr: ToastrService,private _router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this._account.currentUser$.pipe(
        map((user: IUser) => {
          if(user.isAdmin){

            return true
          }


          this._toastr.error("Not Authorized", "Only Admins can reach this route");
          this._router.navigate(['account/login']);
        })
      )
  }

}
