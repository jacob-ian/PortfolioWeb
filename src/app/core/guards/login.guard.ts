import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.user$.pipe(
      tap((user) => {
        // Check for a user
        if (user) {
          // Get any redirect instructions
          const { redirect_path } = route.queryParams;

          // Check if the user is registered
          if (user.isRegistered) {
            // Check if there are redirect instructions
            if (redirect_path) {
              // Redirect the user
              this.router.navigate([redirect_path]);
            } else {
              // Redirect the user to the dashboard
              this.router.navigate(['/dashboard']);
            }
          } else {
            // The user needs to go through registration
            this.router.navigate(['/register'], {
              queryParams: { redirect_path },
            });
          }
        }
      }),
      map((user) => !!!user)
    );
  }
}
