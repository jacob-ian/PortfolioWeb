import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { MetaService } from '../core/services/meta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {}

  // The subscription to the url
  routeSubscription: Subscription;

  // The meta tag subscription service
  metaSubscription: Subscription;

  // The currently navigated route
  currentRoute: string;

  ngOnInit(): void {
    // Subscribe to the page change event to update the active class
    this.routeSubscription = this.classSubscribe();

    // Subscribe to the meta tags service
    this.metaSubscription = this.metaService.subscribe();
  }

  /**
   * Subscribe to the router events to get the path and update the nav button's active class
   * @returns a subscription
   */
  classSubscribe(): Subscription {
    return this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.url)
      )
      .subscribe((event) => {
        // Get the path of the url
        const paths = event.map((url) => url.path);

        // Set the path
        this.currentRoute = paths[0] ? paths[0] : '';
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.metaSubscription) {
      this.metaSubscription.unsubscribe();
    }
  }
}
