import {
  ApplicationRef,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { DialogOptions } from '@functions/misc/services.models';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  /**
   * Create a dialog pop-up.
   * @param options the options for the dialog.
   * @returns void
   * @throws DialogError
   */
  create(options: DialogOptions): void {
    // Create the component ref
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(DialogComponent)
      .create(this.injector);

    // Add the dialog options with the build commmand
    componentRef.instance.build(options);

    // Attach the component to the application reference
    this.appRef.attachView(componentRef.hostView);

    // Get the DOM elements from the component
    const domElements = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append the HTML elements to the DOM body
    document.body.appendChild(domElements);

    // Bind to the close event input
    componentRef.instance.closeEventEmitter.subscribe((event) => {
      // Make sure the close boolean is true
      if (event === true) {
        // Remove the dialog from the view
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      }
    });
  }
}
