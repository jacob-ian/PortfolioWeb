import { Observable, of } from 'rxjs';
import { MockDatabaseService } from '../database/mock-database-service';
import { Qualifications } from '@shared/education';
import { Qualification } from './qualification';
import { QualificationFactory } from './qualification-factory';

const TEST_DOC_1: Qualifications.Document = {
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
};

const TEST_DOC_2: Qualifications.Document = {
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
};

const TEST_QUALIFICATION_DOCS: Observable<Qualifications.Document[]> = of([
  TEST_DOC_1,
  TEST_DOC_2,
]);

const TEST_QUALIFICATION_DOCS_EMPTY = of([]);

describe('Education -> QualificationFactory', () => {
  let mockDatabase: any = new MockDatabaseService([]);
  let qualFactory: QualificationFactory;

  describe('Test with existing documents', () => {
    beforeEach(() => {
      qualFactory = new QualificationFactory(mockDatabase);
    });

    describe('Test creating the Qualifications', () => {
      it('Should return an observable', () => {
        let observable = qualFactory.createFromCollection(
          TEST_QUALIFICATION_DOCS
        );
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should have a non-empty array', () => {
        qualFactory
          .createFromCollection(TEST_QUALIFICATION_DOCS)
          .subscribe((arr) => {
            expect(arr.length).toBeTruthy();
          });
      });

      it('Should return Qualifications in the observable array', () => {
        qualFactory
          .createFromCollection(TEST_QUALIFICATION_DOCS)
          .subscribe((arr) => {
            expect(arr[0]).toBeInstanceOf(Qualification);
          });
      });

      it('Should contain a test Qualification object', () => {
        qualFactory
          .createFromCollection(TEST_QUALIFICATION_DOCS)
          .subscribe((arr) => {
            const testQual = new Qualification(mockDatabase, TEST_DOC_1);
            expect(arr).toContain(testQual);
          });
      });
    });
  });

  describe('Test with non-existent documents', () => {
    beforeEach(() => {
      qualFactory = new QualificationFactory(mockDatabase);
    });

    describe('Test creating the Qualifications', () => {
      it('Should return an observable', () => {
        let observable = qualFactory.createFromCollection(
          TEST_QUALIFICATION_DOCS_EMPTY
        );
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return an empty array in the observable', () => {
        qualFactory
          .createFromCollection(TEST_QUALIFICATION_DOCS_EMPTY)
          .subscribe((quals) => {
            expect(quals.length).toBeFalsy();
          });
      });
    });
  });
});
