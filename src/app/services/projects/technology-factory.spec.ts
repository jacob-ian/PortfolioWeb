import { Observable, of } from 'rxjs';
import { Technologies } from '@shared/projects';
import { Technology } from './technology';
import { TechnologyFactory } from './technology-factory';

const TEST_TECH_DOCS: Technologies.Document[] = [
  { id: '1', name: 'angular' },
  { id: '2', name: 'react' },
];

const TEST_EMPTY_DOCS: Technologies.Document[] = [];

describe('TechnologyFactory', () => {
  let factory: TechnologyFactory;
  let mockDatabase: any = {};

  describe('Test creating Technologies', () => {
    describe('Test with existing documents', () => {
      let observable: Observable<any[]>;

      beforeEach(() => {
        factory = new TechnologyFactory(mockDatabase);
        observable = factory.createFromCollection(of(TEST_TECH_DOCS));
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
          const testProj = new Technology(mockDatabase, TEST_TECH_DOCS[0]);
          expect(technologies[0]).toEqual(testProj);
        });
      });
    });

    describe('Test with no existing documents', () => {
      let observable: Observable<any[]>;

      beforeEach(() => {
        factory = new TechnologyFactory(mockDatabase);
        observable = factory.createFromCollection(of(TEST_EMPTY_DOCS));
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
