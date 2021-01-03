import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DialogOptions } from '@functions/misc/services.models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20%)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate(
          '200ms ease-in-out',
          style({ opacity: 0, transform: 'translateY(20%)' })
        ),
      ]),
    ]),
  ],
})
export class DialogComponent implements OnInit, AfterViewInit {
  // The boolean to show the dialog content
  @Input() showAll: boolean = true;

  // The inner html of the dialog
  @Input('innerHMTL') innerHTML: string;

  // The embedded component
  @Input('component') component: any;

  // The content container
  @ViewChild('viewContainer', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  // The dialog's action button content
  @Input('actionButtonContent') actionButtonContent: string;

  // The output listener for closing the dialog
  @Output('close') closeEventEmitter = new EventEmitter<boolean>();

  // The escape key listener to close the dialog
  @HostListener('document:keydown.escape', ['$event']) onKeyDownHandler() {
    // Close the dialog
    this.closeDialog();
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngAfterViewInit(): void {
    // Check for the properties
    if (this.innerHTML && this.component) {
      // Throw an error that you can only use one
      throw {
        message: 'Please only use innerHTML OR component for dialog creation.',
      };
    }

    // Check for a component
    if (this.component) {
      // Render a component in the dialog card
      // Create the component factory
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        this.component
      );

      // Append the component to the dialog
      this.viewContainerRef.createComponent(componentFactory);
    }
  }

  ngOnInit(): void {}

  /**
   * The build command for the dialog that sets all of the necessary parameters and options.
   * @returns void
   */
  build(options: DialogOptions): void {
    // Get the contents of the options
    const { innerHtml, component, action } = options;

    // Set the options as properties
    this.innerHTML = innerHtml;
    this.component = component;

    // Check if there is a dialog action
    if (action) {
      // The content of the action button
      this.actionButtonContent = options.action.buttonContent;

      // Assign the action of the button
      this.dialogAction = options.action.fn;
    }
  }

  /**
    The action of the action button.
    @returns void.
   */
  dialogAction(): void {}

  /**
   * Closes the dialog.
   * @returns void.
   */
  closeDialog(): void {
    // Set show to no
    this.showAll = false;

    // Wait and then emit the close boolean
    setTimeout(() => {
      // Emit the close boolean
      this.closeEventEmitter.emit(true);
    }, 200);
  }
}
