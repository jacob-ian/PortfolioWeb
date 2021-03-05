/**
 * The options for a pop-up dialog from the Dialog service.
 *
 */
export interface DialogOptions {
  innerHtml?: string; // the inner HTML of the dialog
  component?: any; // an Angular component to show
  action?: DialogAction; // the Dialog's action button config
}

/**
 * A dialog action button.
 */
export interface DialogAction {
  buttonContent: string; // the content of the action button
  fn: (param?: any) => void; // the button's action.
}
