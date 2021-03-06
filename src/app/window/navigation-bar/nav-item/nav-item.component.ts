import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.sass'],
})
export class NavItemComponent implements OnInit, OnDestroy {
  @Input('route') private route: string;
  @Input('icon') private iconUrl: string | undefined;
  @Input('updateWhenActive') private updateWhenActive: string | undefined;
  @Input('routerLinkActive') private routerLinkActive: string | undefined;

  private subscriptionToCurrentRoute: Subscription;
  private activeRoute: string;

  constructor(private navigationService: NavigationService) {
    this.subscriptionToCurrentRoute = this.subscribeToCurrentRoute();
  }

  private subscribeToCurrentRoute(): Subscription {
    return this.navigationService
      .getCurrentRouteObservable()
      .subscribe((route) => this.updateActiveRoute(route));
  }

  private updateActiveRoute(route: string): void {
    this.activeRoute = route;
  }

  public ngOnInit(): void {}

  public isRouteActive(): boolean {
    return this.route === this.activeRoute;
  }

  public isUpdateable(): boolean {
    if (!this.updateWhenActive) {
      return true;
    }
    return this.updateWhenActive === 'true' ? true : false;
  }

  public setUpdateable(boolean: string): void {
    this.updateWhenActive = boolean;
  }

  public isButtonActive(): boolean {
    if (this.isUpdateable()) {
      return this.isRouteActive();
    }
    return false;
  }

  public isRouterLinkActive(): string {
    if (!this.routerLinkActive) {
      return 'true';
    }
    return this.routerLinkActive === 'true' ? 'true' : 'false';
  }

  public getRoute(): string {
    return this.route;
  }

  public setRoute(route: string): void {
    this.route = route;
  }

  public getIconUrl(): string {
    return this.iconUrl ? this.iconUrl : '';
  }

  public ngOnDestroy(): void {
    this.unsubscribeFromObservables();
  }

  private unsubscribeFromObservables(): void {
    if (this.subscriptionToCurrentRoute) {
      this.subscriptionToCurrentRoute.unsubscribe();
    }
  }
}
