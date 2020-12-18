import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
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
export class DropdownComponent implements OnInit {
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

  ngOnInit(): void {}

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
