/**
 * The options for a pop-up dialog from the Dialog service.
 *
 */
export interface DialogOptions {
  innerHtml?: string; // the inner HTML of the dialog
  component?: any; // an Angular component to show
  action?: {
    // the dialog's action button
    buttonContent: string; // the content of the action button
    fn: () => void; // the action of the button
  };
}
