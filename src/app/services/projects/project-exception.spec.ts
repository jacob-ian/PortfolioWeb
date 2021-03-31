import { ProjectException } from './project-exception';

describe('ProjectException', () => {
  let exception: ProjectException;

  describe('Create with error inputs', () => {
    let error = 'invalid-input';
    let message = 'this is a test';

    beforeEach(() => {
      exception = new ProjectException(error, message);
    });

    it('Should return a message with the right inputs and ID', () => {
      let message = exception.getMessage();
      expect(message).toBe('PROJ | invalid-input: this is a test');
    });
  });
});
