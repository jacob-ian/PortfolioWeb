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
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime, filter, last } from 'rxjs/operators';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.sass'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  // The boolean of whether or not the search box is open
  @Input() isSearchOpen: boolean = false;

  // The keypress listener for the search box
  @HostListener('document:keydown.escape', ['$event']) onKeyDownHandler() {
    // Check if the search is open
    if (this.isSearchOpen) {
      // We can close the search box
      this.close();
    }
  }

  // The click listener
  @HostListener('window:click', ['$event']) onClick(event: any) {
    // Check if the search is open
    if (this.isSearchOpen) {
      // Get the id of the target
      const id = event.target.id;

      // Check if the id includes the search-box term
      if (!id.includes('search-box')) {
        // Close the search box
        this.close();
      }
    }
  }

  // The search button
  @ViewChild('searchButton', { static: true }) searchButtonRef: ElementRef;
  searchButton: HTMLButtonElement;

  // The search box
  @ViewChild('searchBox', { static: true }) searchBoxRef: ElementRef;
  searchBox: HTMLElement;

  // The search input
  @ViewChild('searchInput', { static: true }) searchInputRef: ElementRef;
  searchInput: HTMLInputElement;

  // Create a behaviour subject for the search query
  searchQuery: BehaviorSubject<string | null>;

  // The subscription to the search observable
  searchSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Define the button
    this.searchButton = this.searchButtonRef.nativeElement;

    // Define the search box
    this.searchBox = this.searchBoxRef.nativeElement;

    // Define the input element
    this.searchInput = this.searchInputRef.nativeElement;

    // Create and subscribe to the search query
    this.searchQuery = new BehaviorSubject(null);
    this.searchSub = this.searchQuery
      .pipe(
        filter((query) => query !== null), // remove all bad values
        debounceTime(400) // debounce for 400ms so the subscription isnt spammed
      )
      .subscribe((query) => {
        // Search Algolia for the query
        if (query.length > 0) {
          console.log(`Search: ${query}`); // TODO: Add Algolia search
        }
      });
  }

  ngOnDestroy(): void {
    // Check for the search subscription and unsubscribe
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

  /**
   * Search the database for a blog post by the query
   * @param query the query string to search
   */
  search(query: string): void {
    this.searchQuery.next(query);
  }

  /**
   * Open the search box
   */
  open(): void {
    // Remove the hide box class
    this.searchBox.classList.remove('hide-box');

    // Set the show boolean to true
    this.isSearchOpen = true;

    // Make the button uninteractable
    this.searchButton.disabled = true;

    // Focus on the input
    this.searchInput.focus();
  }

  /**
   * Close the search box.
   */
  close(): void {
    // Add the hide box class to the search box
    this.searchBox.classList.add('hide-box');

    // Set a timeout for the box to disappear
    setTimeout(() => {
      // We can remove the show and hide class from the box
      this.isSearchOpen = false;

      // Allow the button to be pressed again
      this.searchButton.disabled = false;
    }, 100);
  }
}
