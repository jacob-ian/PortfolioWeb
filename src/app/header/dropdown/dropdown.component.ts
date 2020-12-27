import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass'],
  animations: [
    trigger('dropdownAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scaleY(0.5)',
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
          style({ opacity: 0, transform: 'scaleY(0.5)' })
        ),
      ]),
    ]),
  ],
})
export class DropdownComponent implements OnInit {
  // The user observable
  user$: Observable<User>;

  // Create an expanded boolean
  @Input() isExpanded: boolean = false;

  // The app version string
  @Input() version: string = environment.appVersion;

  // Create an on click listener
  @HostListener('window:click', ['$event']) onClick(event) {
    // Check if the event target has the nav-dropdown class list
    const classList: DOMTokenList = event.target.classList;
    if (!classList.contains('nav-dropdown')) {
      // Close the navigation drop down
      this.isExpanded = false;
    }
  }

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Define the user from the auth service
    this.user$ = this.auth.user$;
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
}
