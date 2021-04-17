import * as functions from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import { FeaturesList } from 'firebase-functions-test/lib/features';
import { WrappedFunction } from 'firebase-functions-test/lib/main';
import { updateTechOnProjectCreate } from './updateTechOnProjectCreate.function';

describe('Test updateTechOnProjectCreate', () => {
  let oldEnv = process.env;
  let testing: FeaturesList;
  let wrapped: WrappedFunction;

  beforeAll(() => {
    process.env.GCLOUD_PROJECT = 'jacobianmatthews-portfolio';
  });

  beforeEach(() => {
    testing = functions();
    wrapped = testing.wrap(updateTechOnProjectCreate);
  });

  afterEach(() => {
    testing.cleanup();
  });

  afterAll(() => {
    process.env = oldEnv;
  });

  describe('Test with no existing technologies', () => {
    let mockAdmin: jest.SpyInstance;
    beforeEach(() => {
      mockAdmin = jest
        .spyOn(admin, 'firestore')
        .mockImplementation(existingImplementation);

      const snap = {
        data: () => ({
          id: 'project1',
          technologies: ['test1', 'test2', 'test3'],
        }),
      };
      wrapped(snap);
    });
    afterEach(() => {
      mockAdmin.mockRestore();
    });

    it('Should call get on the collection', () => {
      expect(mockGetFunction).toBeCalled();
    });

    it('Should call the update method', () => {});
  });
});

const existingImplementation: any = {
  collection: jest.fn((path) => ({
    where: jest.fn((query) => ({
      get: mockGetFunction,
    })),
  })),
};

let mockGetFunction = jest.fn();
mockGetFunction.mockResolvedValueOnce({
  empty: false,
  size: 1,
  docs: [
    {
      id: '1',
      name: 'test1',
      projects: ['project2'],
    },
  ],
});
mockGetFunction.mockResolvedValueOnce({
  empty: false,
  size: 1,
  docs: [
    {
      id: '2',
      name: 'test2',
      projects: ['project2'],
    },
  ],
});
mockGetFunction.mockResolvedValueOnce({
  empty: false,
  size: 1,
  docs: [
    {
      id: '3',
      name: 'test3',
      projects: ['project2'],
    },
  ],
});
