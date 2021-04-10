import { Injectable } from '@angular/core';
import { Exception } from './exception';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  public error(exception: any) {
    let message: string;

    if (this.isException(exception)) {
      message = exception.getMessage();
    } else {
      message = exception.message;
    }

    console.error(message);
  }

  isException(exception: any): exception is Exception {
    return exception instanceof Exception;
  }
}
