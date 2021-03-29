import { Exception } from './exception';

describe('Exception', () => {
  let exception: Exception;

  describe('Test getting the message', () => {
    describe('Test with input object', () => {
      it('Should return the right message', () => {
        const err = {
          error: 'invalid',
          message: 'This is a test.',
        };
        exception = new Exception('TEST', err);
        const message = exception.getMessage();
        expect(message).toBe('TEST | invalid: This is a test.');
      });
    });

    describe('Test with the input variables', () => {
      it('Should return the right message', () => {
        const id = 'TEST';
        const err = 'invalid';
        const message = 'This is a test';
        const context = { error: 'TESTING' };

        const exception = new Exception(id, err, message, context);
        expect(exception.getMessage()).toBe('TEST | invalid: This is a test');
      });
    });
  });
});
