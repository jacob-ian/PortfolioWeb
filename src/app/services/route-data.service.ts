import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

const EMPTY_OBJECT = {};

@Injectable({
  providedIn: 'root',
})
export class RouteDataService implements OnDestroy {
  private subscriptionToRouterEvents: Subscription;
  private routeDataObservable: BehaviorSubject<Data> = new BehaviorSubject(
    EMPTY_OBJECT
  );

  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscriptionToRouterEvents = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateRouteData();
      });
  }

  private updateRouteData(): void {
    let routeData = this.route.snapshot.firstChild.data;
    return this.setRouteData(routeData);
  }

  public setRouteData(data: Data): void {
    return this.routeDataObservable.next(data);
  }

  public getRouteData(): Data {
    return this.routeDataObservable.value;
  }

  public getRouteDataObservable(): Observable<Data> {
    return this.routeDataObservable.asObservable();
  }

  public ngOnDestroy(): void {
    this.unsubscribeFromObservables();
  }

  private unsubscribeFromObservables(): void {
    if (this.subscriptionToRouterEvents) {
      this.subscriptionToRouterEvents.unsubscribe();
    }
  }
}
