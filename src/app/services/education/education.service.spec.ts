import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { MockDatabaseService } from '../database/mock-database-service';
import { EducationService } from './education.service';
import { Qualification } from './qualification';
import { Qualifications } from '@shared/education';

const TEST_QUALIFICATION_DOCS: Qualifications.Document[] = [
  {
    id: '1',
    name: 'Fake Degree',
    description: 'A Minor in Testing',
    dateStart: new Date('January 1, 2021').getTime(),
    dateEnd: new Date('February 1, 2021').getTime(),
    handbookUrl: 'http://google.com',
    institution: {
      name: 'Test Academy',
      location: 'Perth, WA',
      url: 'http://test.example.com',
      imageUrl: 'http://google.com/logo.png',
      type: 'CollegeOrUniversity',
    },
    credentialCategory: 'degree',
    educationLevel: 'intermediate',
  },
  {
    id: '2',
    name: 'Fake Degree2',
    description: 'A Minor in Testing2',
    dateStart: new Date('January 1, 2021').getTime(),
    dateEnd: new Date('February 1, 2021').getTime(),
    handbookUrl: 'http://google2.com',
    institution: {
      name: 'Test Academy2',
      location: 'Perth2, WA',
      url: 'http://test2.example.com',
      imageUrl: 'http://google.com2/logo.png',
      type: 'CollegeOrUniversity',
    },
    credentialCategory: 'degree',
    educationLevel: 'intermediate',
  },
];

describe('EducationService', () => {
  let service: EducationService;
  let mockDatabase: any;

  describe('Test getting the Qualifications', () => {
    describe('Test with existing qualification documents', () => {
      let observable: Observable<Qualification[]>;

      beforeEach(() => {
        mockDatabase = new MockDatabaseService(TEST_QUALIFICATION_DOCS);
        TestBed.configureTestingModule({
          providers: [{ provide: DatabaseService, useValue: mockDatabase }],
        });
        service = TestBed.inject(EducationService);
        observable = service.getQualifications();
      });

      it('Should return an observable', () => {
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return a non empty array in the observable.', () => {
        observable.subscribe((quals) => {
          expect(quals.length).toBeTruthy();
        });
      });

      it('Should return an array with Qualification objects', () => {
        observable.subscribe((quals) => {
          expect(quals[0]).toBeInstanceOf(Qualification);
        });
      });

      it('Should return the test Qualification object inside the array', () => {
        observable.subscribe((quals) => {
          const testObj = new Qualification(
            mockDatabase,
            TEST_QUALIFICATION_DOCS[0]
          );
          expect(quals[0]).toEqual(testObj);
        });
      });
    });
    describe('Test without any qualification documents', () => {
      let observable: Observable<Qualification[]>;

      beforeEach(() => {
        mockDatabase = new MockDatabaseService([]);
        TestBed.configureTestingModule({
          providers: [{ provide: DatabaseService, useValue: mockDatabase }],
        });
        service = TestBed.inject(EducationService);
        observable = service.getQualifications();
      });

      it('Should return an observable', () => {
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return an empty array in the observable.', () => {
        observable.subscribe((quals) => {
          expect(quals.length).toBeFalsy();
        });
      });
    });
  });
});
