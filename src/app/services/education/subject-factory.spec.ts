import { Observable } from 'rxjs';
import { MockFirestore } from '../database/mock-firestore';
import { Subject, SubjectDocument } from './subject';
import { SubjectFactory } from './subject-factory';

export const TEST_SUBJECT_DOCS_1: SubjectDocument[] = [
  {
    id: '1',
    name: 'Test 1',
    handbookUrl: 'test.com',
  },
  {
    id: '2',
    name: 'Test 2',
    handbookUrl: 'test2.com',
  },
];
const TEST_DOCS_EMPTY = [];

describe('Education -> SubjectFactory', () => {
  let mockFirestore: any;
  let subjectFactory: SubjectFactory;

  describe('Test with existing documents', () => {
    beforeEach(() => {
      mockFirestore = new MockFirestore(TEST_SUBJECT_DOCS_1);
      subjectFactory = new SubjectFactory(mockFirestore, '');
    });

    describe('Test creating the Subjects', () => {
      it('Should return an observable', () => {
        let observable = subjectFactory.createFromCollection();
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should have a non-empty array', () => {
        subjectFactory.createFromCollection().subscribe((arr) => {
          expect(arr.length).toBeTruthy();
        });
      });

      it('Should return Subjects in the observable array', () => {
        subjectFactory.createFromCollection().subscribe((arr) => {
          expect(arr[0]).toBeInstanceOf(Subject);
        });
      });

      it('Should contain a test Subject object', () => {
        subjectFactory.createFromCollection().subscribe((arr) => {
          const testSubject = new Subject(
            mockFirestore,
            TEST_SUBJECT_DOCS_1[1]
          );
          expect(arr).toContain(testSubject);
        });
      });
    });
  });

  describe('Test with non-existent documents', () => {
    beforeEach(() => {
      mockFirestore = new MockFirestore(TEST_DOCS_EMPTY);
      subjectFactory = new SubjectFactory(mockFirestore, '');
    });

    describe('Test creating the Subjects', () => {
      it('Should return an observable', () => {
        let observable = subjectFactory.createFromCollection();
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return an empty array in the observable', () => {
        subjectFactory.createFromCollection().subscribe((subjects) => {
          expect(subjects.length).toBeFalsy();
        });
      });
    });
  });
});
