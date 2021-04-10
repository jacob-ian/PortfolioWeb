interface ErrorObject {
  errorCode: string;
  message: string;
}

export class EducationException {
  private errorCode: string;
  private errorMessage: string;
  private context: any | undefined;

  constructor();
  constructor(errorObject: ErrorObject);
  constructor(error: string, message: string);
  constructor(error: string, message: string, context?: any);
  constructor(error?: string | ErrorObject, message?: string, context?: any) {
    if (this.errorObjectProvided(error)) {
      this.errorCode = error.errorCode;
      this.errorMessage = error.message;
    } else {
      this.errorCode = error;
      this.errorMessage = message;
      this.context = context;
    }
  }

  private errorObjectProvided(
    error: ErrorObject | string
  ): error is ErrorObject {
    if (typeof error === 'string') {
      return false;
    } else if (error) {
      return true;
    } else {
      return false;
    }
  }

  public getMessage(): string {
    return this.errorMessage;
  }

  public getErrorCode(): string {
    return this.errorCode;
  }
}
