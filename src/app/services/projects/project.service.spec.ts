import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { MockFirestore } from '../database/mock-firestore';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;
  let mockFirestore: any = new MockFirestore([]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: mockFirestore }],
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
