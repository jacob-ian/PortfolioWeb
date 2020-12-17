import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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

  // The navigation drawer
  @ViewChild('navigationDrawer', { static: true }) drawerRef: ElementRef;
  navigationDrawer: HTMLElement;

  // The clickable area to close the navigation drawer
  @ViewChild('clickArea', { static: true }) clickAreaRef: ElementRef;
  clickArea: HTMLElement;

  // The subscription to the url
  routeSubscription: Subscription;

  // The meta tag subscription service
  metaSubscription: Subscription;

  // The currently navigated route
  @Input() currentRoute: string;

  // The boolean to show an open drawer
  isDrawerOpen: boolean;

  ngOnInit(): void {
    // Define the navigation drawer and clickable area
    this.navigationDrawer = this.drawerRef.nativeElement;
    this.clickArea = this.clickAreaRef.nativeElement;

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

        // Set the drawer to closed
        if (this.isDrawerOpen) {
          this.closeDrawer();
        }
      });
  }

  /**
   * Open the navigation drawer
   * @returns void
   */
  openDrawer(): void {
    // Add the open class to the drawer and remove the close class
    this.navigationDrawer.classList.remove('close');
    this.navigationDrawer.classList.add('open');

    // Add the class to clickable area
    this.clickArea.classList.add('drawer-open');

    // Change the drawer boolean
    this.isDrawerOpen = true;
  }

  /**
   * Close the navigation drawer
   * @returns void
   */
  closeDrawer(): void {
    // Remove the open class from the drawer and add the close class
    this.clickArea.classList.remove('drawer-open');
    this.navigationDrawer.classList.add('close');
    setTimeout(() => {
      // Remove the open class form the drawer
      this.navigationDrawer.classList.remove('open');

      // Change the boolean
      this.isDrawerOpen = false;
    }, 250);
  }

  /**
   * Perform a search of the blog.
   * @param query the search query
   * @retunrs void
   */
  search(query: string): void {
    console.log(query);
  }

  /**
   * Gives focus to the search input
   * @returns void
   */
  focusSearch(): void {
    // Find the input
    const input = document.getElementById('search-input') as HTMLInputElement;

    // Set the input as focused
    input.focus();
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
