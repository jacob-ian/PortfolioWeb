import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

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
      map((user) => !!user),
      tap((loggedIn) => {
        // Grab the path to the current page and the query parameters
        const path = state.url;

        // Check if the user is logged in
        if (!loggedIn) {
          // The user isn't logged in, redirect to the login page
          this.router.navigate(['/login'], {
            queryParams: {
              redirect_path: path,
            },
          });
        }
      })
    );
  }
}
