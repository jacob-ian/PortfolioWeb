import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  state,
} from '@angular/animations';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '200ms ease-in-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate(
          '200ms ease-in-out',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class NotificationsComponent implements OnInit {
  // The notification title
  @Input('title') title: string;

  // The notification body
  @Input('body') body: string;

  // The notification icon
  @Input('icon') icon: string;

  // The notification click action
  @Input('clickAction') clickAction: string;

  // The close button
  @Output('close') close = new EventEmitter<boolean>();

  // The show elements boolean
  @Input() showElements: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Set up the notification object.
   * @param title the notification title
   * @param body the body of the notification
   * @param icon an icon to show on the notification
   * @param routerLink the routerLink of the notification
   */
  init(title: string, body: string, icon: string, routerLink: string): void {
    // Set all of the inputs
    this.title = title;
    this.body = body;
    this.icon = icon;
    this.clickAction = routerLink;
  }

  /**
   * Close the notification with animation
   */
  closeNotification(emit?: boolean): void {
    // Remove the elements from the dom
    this.showElements = false;

    // Check if we need to emit the close
    if (emit) {
      // Call the close emitter
      setTimeout(() => {
        this.close.emit(true);
      }, 200);
    }
  }
}
