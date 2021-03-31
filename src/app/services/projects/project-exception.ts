import { Exception } from '../exception';

export class ProjectException extends Exception {
  constructor(obj: any);
  constructor(error: string, message: string);
  constructor(error: string, message: string, context: any);
  constructor(errorOrObj: any | string, message?: string, context?: any) {
    super('PROJ', errorOrObj, message, context);
  }
}
