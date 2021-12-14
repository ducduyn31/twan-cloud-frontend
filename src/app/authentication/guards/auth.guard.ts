import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {asyncScheduler, Observable, of, scheduled} from 'rxjs';
import * as moment from 'moment';
import {AuthService} from '../services/auth.service';
import {map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser.pipe(
      mergeMap((user) => {
        if (!user) {
          return of(this.router.createUrlTree(['auth']));
        }

        return scheduled(user.getIdTokenResult(), asyncScheduler)
          .pipe(map((result: any) => !moment(result.expirationTime).isBefore(moment())));
      })
    );
  }
}
