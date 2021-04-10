import { Observable, of } from 'rxjs';
import { Subject } from './subject';
import { Subjects } from '@shared/education';
import { SubjectFactory } from './subject-factory';

const TEST_DOC_1: Subjects.Document = {
  id: '1',
  name: 'Test 1',
  handbookUrl: 'test.com',
};

const TEST_DOC_2: Subjects.Document = {
  id: '2',
  name: 'Test 2',
  handbookUrl: 'test2.com',
};

export const TEST_SUBJECT_DOCS_1: Observable<Subjects.Document[]> = of([
  TEST_DOC_1,
  TEST_DOC_2,
]);
const TEST_DOCS_EMPTY = of([]);

describe('Education -> SubjectFactory', () => {
  let mockDatabase: any;
  let subjectFactory: SubjectFactory;

  describe('Test with existing documents', () => {
    beforeEach(() => {
      subjectFactory = new SubjectFactory(mockDatabase);
    });

    describe('Test creating the Subjects', () => {
      it('Should return an observable', () => {
        let observable = subjectFactory.createFromCollection(
          TEST_SUBJECT_DOCS_1
        );
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should have a non-empty array', () => {
        subjectFactory
          .createFromCollection(TEST_SUBJECT_DOCS_1)
          .subscribe((arr) => {
            expect(arr.length).toBeTruthy();
          });
      });

      it('Should return Subjects in the observable array', () => {
        subjectFactory
          .createFromCollection(TEST_SUBJECT_DOCS_1)
          .subscribe((arr) => {
            expect(arr[0]).toBeInstanceOf(Subject);
          });
      });

      it('Should contain a test Subject object', () => {
        subjectFactory
          .createFromCollection(TEST_SUBJECT_DOCS_1)
          .subscribe((arr) => {
            const testSubject = new Subject(mockDatabase, TEST_DOC_1);
            expect(arr).toContain(testSubject);
          });
      });
    });
  });

  describe('Test with non-existent documents', () => {
    beforeEach(() => {
      subjectFactory = new SubjectFactory(mockDatabase);
    });

    describe('Test creating the Subjects', () => {
      it('Should return an observable', () => {
        let observable = subjectFactory.createFromCollection(TEST_DOCS_EMPTY);
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return an empty array in the observable', () => {
        subjectFactory
          .createFromCollection(TEST_DOCS_EMPTY)
          .subscribe((subjects) => {
            expect(subjects.length).toBeFalsy();
          });
      });
    });
  });
});
