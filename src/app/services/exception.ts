export class Exception {
  private id: string;
  private error: string;
  private message: string;
  private context: any;

  constructor(errorId: string, obj: any);
  constructor(errorId: string, error: string, message: string);
  constructor(errorId: string, error: string, message: string, context: any);
  constructor(
    errorId: string,
    objOrError: string | any,
    message?: string,
    context?: any
  ) {
    this.id = errorId;
    this.message = '';

    if (context) {
      this.context = context;
    }

    if (this.isError(objOrError)) {
      this.error = objOrError;
      this.message = message;
      return;
    }

    if (objOrError.message) {
      this.message = objOrError.message;
    }

    if (objOrError.error) {
      this.error = objOrError.error;
      return;
    }

    this.error = 'unknown';
  }

  private isError(error: string | any): error is string {
    return typeof error === 'string';
  }

  public getMessage(): string {
    return `${this.id} | ${this.error}: ${this.message}`;
  }
}
