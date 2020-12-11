import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Check if there is a user logged in and can thus access a page.
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the user is logged in by getting the user object from the auth service
    return this.auth.user$.pipe(
      take(1), // disregard the first, null value and get the second object
      map((user) => !!user), // convert the user object into a boolean
      tap((loggedIn) => {
        // Check if the user is logged in
        if (!loggedIn) {
          // The user isn't logged in, redirect to the login page
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
