import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface AbstractRouteDataService {
  setRouteData(data: RouteData): void;
  getRouteData(): RouteData;
  getRouteDataObservable(): Observable<RouteData>;
}

export interface RouteData {
  title: string;
  meta: RouteDataTag[];
  og: RouteDataTag[];
}

export interface RouteDataTag {
  name: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class RouteDataService implements AbstractRouteDataService, OnDestroy {
  private subscriptionToRouterEvents: Subscription;
  private routeDataObservable: BehaviorSubject<RouteData> = new BehaviorSubject(
    null
  );

  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscriptionToRouterEvents = this.subscribeToNavigationEndEvents();
  }

  private subscribeToNavigationEndEvents(): Subscription {
    return this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateRouteData();
      });
  }

  private updateRouteData(): void {
    let snapshotData = this.route.snapshot.firstChild?.data;
    if (snapshotData) {
      let routeData: RouteData = {
        title: snapshotData.title,
        meta: snapshotData.meta,
        og: snapshotData.og,
      };
      return this.setRouteData(routeData);
    }
  }

  public setRouteData(data: RouteData): void {
    return this.routeDataObservable.next(data);
  }

  public getRouteData(): RouteData {
    return this.routeDataObservable.value;
  }

  public getRouteDataObservable(): Observable<RouteData> {
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
