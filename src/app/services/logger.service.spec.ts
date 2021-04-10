import { TestBed } from '@angular/core/testing';
import { Exception } from './exception';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test logging a message', () => {
    describe('Test with an Exception object', () => {
      let exception: Exception;

      beforeEach(() => {
        exception = new Exception('TEST', 'invalid', 'This is invalid.');
        spyOn(console, 'error');
      });
      it('Should console.error the right message', () => {
        service.error(exception);
        let expectedMessage = 'TEST | invalid: This is invalid.';
        expect(console.error).toHaveBeenCalledWith(expectedMessage);
      });
    });
  });

  describe('Test with an error object', () => {
    let error: any;
    beforeEach(() => {
      error = { error: 'test', message: 'This is invalid' };
      spyOn(console, 'error');
    });
    it('Should console.error the right message', () => {
      service.error(error);
      expect(console.error).toHaveBeenCalledWith(error.message);
    });
  });
});
