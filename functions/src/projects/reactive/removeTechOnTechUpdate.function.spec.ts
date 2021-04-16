import * as test from 'firebase-functions-test';
import { FeaturesList } from 'firebase-functions-test/lib/features';
import { WrappedFunction } from 'firebase-functions-test/lib/main';

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: jest.fn((path) => ({
      doc: jest.fn((id) => ({
        delete: mockDelete,
      })),
    })),
  }),
}));

let mockDelete = jest.fn();

import { removeTechOnTechUpdate } from './removeTechOnTechUpdate.function';

describe('Test removeTechOnTechUpdate', () => {
  let oldEnv = process.env;
  let testing: FeaturesList;
  let wrapped: WrappedFunction;

  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();

  let change: any;

  beforeAll(() => {
    process.env.GCLOUD_PROJECT = 'jacobianmatthews-portfolio';
  });

  beforeEach(() => {
    testing = test();
    wrapped = testing.wrap(removeTechOnTechUpdate);
  });

  afterEach(() => {
    testing.cleanup();
  });

  afterAll(() => {
    process.env = oldEnv;
  });

  describe('Test with no projects in technology document', () => {
    beforeEach(() => {
      change = {
        after: {
          data: () => ({
            id: '1',
            name: 'test',
            projects: [],
          }),
        },
      };
    });

    it('Should log "Removing technology"', () => {
      wrapped(change);
      let message = `Removing technology: "test".`;
      expect(console.log).toHaveBeenCalledWith(message);
    });

    it('Should call the delete method on Firestore', () => {
      wrapped(change);
      expect(mockDelete).toHaveBeenCalled();
    });
  });

  describe('Test with projects in technology document', () => {
    beforeEach(() => {
      change = {
        after: {
          data: () => ({
            id: '1',
            name: 'test',
            projects: ['abcd1234'],
          }),
        },
      };

      wrapped(change);
    });

    it('Should not log anything to console', () => {
      expect(console.log).not.toHaveBeenCalled();
    });

    it('Should not call the delete method', () => {
      expect(mockDelete).not.toHaveBeenCalled();
    });
  });
});
