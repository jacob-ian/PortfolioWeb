import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationService implements OnDestroy {
  private subscriptionToRoute: Subscription;
  private currentRoute: BehaviorSubject<string>;

  constructor(private router: Router, private location: Location) {
    this.subscriptionToRoute = this.subscribeToRouteChanges();
    this.currentRoute = new BehaviorSubject(null);
  }

  private subscribeToRouteChanges(): Subscription {
    return this.router.events
      .pipe(this.filterRouteFromNavigationEvent())
      .subscribe((route) => this.updateCurrentRoute(route));
  }

  private filterRouteFromNavigationEvent() {
    return function <T>(source: Observable<any>): Observable<string> {
      return source.pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url),
        map((url) => url.split('/')[1])
      );
    };
  }

  private updateCurrentRoute(route: string): void {
    return this.currentRoute.next(route);
  }

  public getCurrentRouteObservable(): Observable<string> {
    return this.currentRoute.asObservable();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromObservables();
  }

  private unsubscribeFromObservables(): void {
    if (this.subscriptionToRoute) {
      this.subscriptionToRoute.unsubscribe();
    }
  }
}
