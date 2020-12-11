import { TestBed } from '@angular/core/testing';

import { AuthorGuard } from './author.guard';

describe('AuthorGuard', () => {
  let guard: AuthorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
