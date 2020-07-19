import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {isPlatformServer} from '@angular/common';
import {SessionService} from '../session.service';
import {Observable, of} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(@Inject(PLATFORM_ID) private platformId: object,
              private router: Router,
              private sessionService: SessionService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuth(state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuth(state);
  }

  private checkAuth(state: RouterStateSnapshot): Observable<boolean> {
    if (isPlatformServer(this.platformId)) {
      this.router.navigate(['/server-load'], {queryParams: {returnUrl: state.url}});
      return of(false);
    } else {
      // TODO: Check for login status
      return this.sessionService.user$.pipe(take(1), map(user => !!user));
    }
  }
}
