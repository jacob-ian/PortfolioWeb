import { FunctionsException } from '../../functions-exception';

export class SnippetAdminException extends FunctionsException {
  constructor(
    errorCode: 'not-found' | 'internal-error' | 'invalid-argument',
    errorMessage: string
  ) {
    super(errorCode, errorMessage);
  }
}
