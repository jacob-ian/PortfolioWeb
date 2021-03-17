export class EducationException {
  private errorCode: string;
  private errorMessage: string;
  private context: any;

  constructor();
  constructor(errorObject: any);
  constructor(error: string, message: string);
  constructor(error: string, message: string, context?: any);
  constructor(error?: string | any, message?: string, context?: any) {
    this.errorCode = error;
    this.errorMessage = message;
    this.context = context;
  }

  public getMessage(): string {
    return this.errorMessage;
  }
}
