export class FunctionsException {
  private errorMessage: string;
  private errorCode: string | undefined;

  constructor(errorCode: string, errorMessage: string) {
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  public getMessage(): string {
    return this.errorMessage;
  }

  public getFormattedError(): string {
    if (this.errorCode) {
      return this.formatErrorWithCode();
    } else {
      return this.getMessage();
    }
  }

  private formatErrorWithCode(): string {
    return `ERROR ${this.errorCode}: ${this.errorMessage}`;
  }
}
