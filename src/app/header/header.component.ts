import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { EventEmitter } from 'events';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RouterLoaderComponent } from '../core/router-loader/router-loader.component';
import { AuthService } from '../core/services/auth.service';
import { MetaService } from '../core/services/meta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  animations: [
    trigger('dropdownAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scaleY(0)',
          'transform-origin': '0% 0%',
        }),
        animate(
          '150ms ease-in-out',
          style({ opacity: 1, transform: 'scaleY(1)' })
        ),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'scaleY(1)',
          'transform-origin': '0% 0%',
        }),
        animate(
          '100ms ease-in-out',
          style({ opacity: 0, transform: 'scaleY(0)' })
        ),
      ]),
    ]),
  ],
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

  // The router loading animator
  @ViewChild('loader', { static: true })
  private navLoaderRef: RouterLoaderComponent;

  // Create an on click listener
  @HostListener('window:click', ['$event']) onClick(event) {
    // Check if the name is the dropdown menu
    const id: string = event.target.id;

    if (!id.includes('nav-dropdown')) {
      // Close the navigation drop down
      this.isExpanded = false;
    }
  }

  // The app version
  @Input() version = environment.appVersion;

  // The subscription to the url
  routeSubscription: Subscription;

  // The meta tag subscription service
  metaSubscription: Subscription;

  // The currently navigated route
  @Input() currentRoute: string;

  // Whether or not to expand the extras draw
  @Input() isExpanded: boolean = false;

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
        filter(
          (event) =>
            // Filter to get the navigation end and start events
            event instanceof NavigationEnd || event instanceof NavigationStart
        ),
        // Tap into the events so that we can start and stop the loading indicator
        tap((event) => {
          // Check if the event is navigation start
          if (event instanceof NavigationStart) {
            // Start the loading animation
            this.navLoaderRef.startLoading();
          } else if (event instanceof NavigationEnd) {
            // Stop the loading animation
            this.navLoaderRef.stopLoading();
          }
          return event;
        }),
        // Filter the events only to navigation end
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

    // Change the body to stop scrolling
    document.body.style.overflow = 'hidden';

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

      // Change the body to stop scrolling
      document.body.style.overflow = 'auto';

      // Change the boolean
      this.isDrawerOpen = false;
    }, 250);
  }

  /**
   * Expand the additional navigation options
   * @returns void
   */
  toggleDropdown(): void {
    // Toggle the dropdown
    this.isExpanded = !this.isExpanded;
  }

  /**
   * Sign out the current user
   */
  signOut(): void {
    this.auth.signOut();
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
