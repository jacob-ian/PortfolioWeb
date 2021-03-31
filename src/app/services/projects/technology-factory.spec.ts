import { Observable } from 'rxjs';
import { MockFirestore } from '../database/mock-firestore';
import { Technology, TechnologyDocument } from './technology';
import { TechnologyFactory } from './technology-factory';

const TEST_TECH_DOCS: TechnologyDocument[] = [
  { id: '1', name: 'angular' },
  { id: '2', name: 'react' },
];

const TEST_EMPTY_DOCS: TechnologyDocument[] = [];

describe('TechnologyFactory', () => {
  let factory: TechnologyFactory;
  let mockFirestore: any;

  describe('Test creating Technologies', () => {
    describe('Test with existing documents', () => {
      let observable: Observable<any[]>;

      beforeEach(() => {
        mockFirestore = new MockFirestore(TEST_TECH_DOCS);
        factory = new TechnologyFactory(mockFirestore);
        observable = factory.createFromCollection();
      });

      it('Should return an observable', () => {
        expect(observable).toBeTruthy();
      });

      it('Should have an array of technologies in the observable', () => {
        observable.subscribe((technologies) => {
          expect(technologies[0]).toBeInstanceOf(Technology);
        });
      });

      it('Should return a test Technology in the array', () => {
        observable.subscribe((technologies) => {
          const testProj = new Technology(mockFirestore, TEST_TECH_DOCS[0]);
          expect(technologies[0]).toEqual(testProj);
        });
      });
    });

    describe('Test with no existing documents', () => {
      let observable: Observable<any[]>;

      beforeEach(() => {
        mockFirestore = new MockFirestore(TEST_EMPTY_DOCS);
        factory = new TechnologyFactory(mockFirestore);
        observable = factory.createFromCollection();
      });

      it('Should return an observable', () => {
        expect(observable).toBeTruthy();
      });

      it('Should have an empty array in the observable.', () => {
        observable.subscribe((array) => {
          expect(array.length).toBeFalsy();
        });
      });
    });
  });
});
