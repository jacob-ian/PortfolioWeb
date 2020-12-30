import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-up-button',
  templateUrl: './up-button.component.html',
  styleUrls: ['./up-button.component.sass'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30%)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(30%)' })
        ),
      ]),
    ]),
  ],
})
export class UpButtonComponent implements OnInit {
  // The input that determines whether to hide or show the button
  @Input() hideButton: boolean = true;

  // The Host listener on the scroll event to check the Y offset
  @HostListener('window:scroll', ['$event']) onScrollListener(event: any) {
    // Check the y offset
    const offset = window.pageYOffset;

    if (offset > 30) {
      // Show the button
      this.show();
    } else {
      this.hide();
    }
  }

  constructor() {}

  ngOnInit(): void {}

  /**
   * Show the scroll up button
   * @returns void
   */
  show(): void {
    // Show the button
    this.hideButton = false;
  }

  /**
   * Hide the scroll button
   * @returns void
   */
  hide(): void {
    // Hide the button
    this.hideButton = true;
  }

  /**
   * Scroll to the top of the window
   * @returns void
   */
  scrollUp(): void {
    // Scroll to the top
    window.scrollTo(0, 0);
  }
}
