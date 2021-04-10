import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  makeStateKey,
  StateKey,
  TransferState,
} from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { DatabaseService } from './database.service';
import { MockFirestore } from './mock-firestore';

const TEST_DOCS = [
  { id: '1', name: 'Test1' },
  { id: '2', name: 'Test2' },
  { id: '3', name: 'Test3' },
];

describe('DatabaseService', () => {
  let service: DatabaseService;
  let transferState: TransferState;
  let firestore: any = new MockFirestore(TEST_DOCS);

  class MockTransferState {
    private data: any;
    private keyStore: StateKey<any>[] = [];
    constructor(initialDocs?: any, initialKey?: StateKey<any>) {
      if (initialDocs) {
        this.data = initialDocs;
      }

      if (initialKey) {
        this.keyStore.push(initialKey);
      }
    }

    hasKey(key: StateKey<any>): boolean {
      return this.keyStore.includes(key);
    }

    get(key: StateKey<any>, defaultValue: any): any {
      return this.data;
    }

    set(key: StateKey<any>, data: any): void {
      this.keyStore.push(key);
      this.data = data;
    }
  }

  describe('Test getting a collection', () => {
    describe('Test getting content during server-side rendering', () => {
      let collection: Observable<unknown[]>;
      let key: StateKey<any>;
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: TransferState, useValue: new MockTransferState() },
            { provide: AngularFirestore, useValue: firestore },
          ],
        });
        service = TestBed.inject(DatabaseService);
        transferState = TestBed.inject(TransferState);
        collection = service.getCollection('test');
        key = makeStateKey('test');
      });

      it('Should return an observable with the documents array', () => {
        collection.subscribe((docs) => {
          expect(docs).toBe(TEST_DOCS);
        });
      });

      it('Should return that the transfer state has the key after calling the method', () => {
        collection.subscribe(() => {
          let hasKey = transferState.hasKey(key);
          expect(hasKey).toBeTrue();
        });
      });

      it('Should save the docs to the transfer state under a key "test"', () => {
        collection.subscribe(() => {
          let storedDocs = transferState.get(key, null);
          expect(storedDocs).toEqual(TEST_DOCS);
        });
      });
    });

    describe('Test getting documents as if from the client after SSR', () => {
      let collection: Observable<unknown[]>;
      let key: StateKey<any> = makeStateKey('test');
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            {
              provide: TransferState,
              useValue: new MockTransferState(TEST_DOCS, key),
            },
            { provide: AngularFirestore, useValue: firestore },
          ],
        });
        service = TestBed.inject(DatabaseService);
        transferState = TestBed.inject(TransferState);
        collection = service.getCollection('test');
      });

      it('Should return the test documents in the observable', () => {
        collection.subscribe((docs) => {
          expect(docs).toEqual(TEST_DOCS);
        });
      });
    });
  });

  describe('Test creating an ID', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: TransferState, useValue: new MockTransferState() },
          { provide: AngularFirestore, useValue: firestore },
        ],
      });
      service = TestBed.inject(DatabaseService);
      transferState = TestBed.inject(TransferState);
    });

    it('Should return a generated ID', () => {
      let id = service.createId();
      expect(id).toBe('generated_id');
    });
  });
});
