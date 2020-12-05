import { TestBed } from '@angular/core/testing';

import { DraftsService } from './drafts.service';

describe('DraftsService', () => {
  let service: DraftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
