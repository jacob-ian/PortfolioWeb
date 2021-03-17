import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { EducationService } from './education.service';

describe('EducationService', () => {
  let service: EducationService;

  let MockAngularFirestore = {
    collection: (path: string) => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: MockAngularFirestore },
      ],
    });
    service = TestBed.inject(EducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test getting the Intitutions Array', () => {});
});
