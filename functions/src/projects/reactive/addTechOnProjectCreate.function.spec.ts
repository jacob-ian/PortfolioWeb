import { describe, beforeEach, afterEach, it } from 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';
import * as testing from 'firebase-functions-test';
import * as admin from 'firebase-admin';
import { addTechOnProjectCreate } from './addTechOnProjectCreate.function';
import { FeaturesList } from 'firebase-functions-test/lib/features';
import { WrappedFunction } from 'firebase-functions-test/lib/main';
import { Projects } from '@shared/projects';

const TEST_PROJECT_DOC_1: Projects.Document = {
  id: '1',
  name: 'Test1',
  technologies: ['angular', 'react', 'typescript'],
  dateStart: 0,
  status: 'ongoing',
  description: 'This is a test',
  links: [{ name: 'test', url: 'google.com' }],
};

describe('Test addTechOnProjectCreate', () => {
  let test: FeaturesList;
  let fn: WrappedFunction;
  stub(admin, 'initializeApp');

  beforeEach(() => {
    test = testing();
    fn = test.wrap(addTechOnProjectCreate);
  });

  afterEach(() => {
    test.cleanup();
  });

  describe('Test with non-existing technologies in the project document', () => {
    let snapshot: any;
    beforeEach(() => {
      snapshot = test.firestore.makeDocumentSnapshot(
        TEST_PROJECT_DOC_1,
        `projects/${TEST_PROJECT_DOC_1.id}`
      );
    });
    it('Should create documents for each technology in technology collection', async () => {
      fn(snapshot).then(async () => {
        return admin
          .firestore()
          .collection('technologies')
          .get()
          .then((querySnapshot) => {
            let docs = querySnapshot.docs.map((doc) => doc.data().name);
            expect(docs).to.deep.equal(['angular', 'react', 'typescript']);
          });
      });
    });
  });

  describe('Test with existing technologies in the project document', () => {
    let snapshot: any;
    beforeEach(async () => {
      snapshot = test.firestore.makeDocumentSnapshot(
        TEST_PROJECT_DOC_1,
        `projects/${TEST_PROJECT_DOC_1.id}`
      );
      return await addTestTechnologies(['angular', 'react', 'typescript']);
    });

    it('Should do nothing', () => {
      fn(snapshot).then(async () => {
        return admin
          .firestore()
          .collection('technologies')
          .get()
          .then((querySnapshot) => {
            let docs = querySnapshot.docs.map((doc) => doc.data().name);
            expect(docs).to.deep.equal(['angular', 'react', 'typescript']);
          });
      });
    });
  });

  async function addTestTechnologies(technolgies: string[]): Promise<void> {
    technolgies.forEach(async (technology) => {
      let collection = admin.firestore().collection('technologies');
      let ref = collection.doc();
      let id = ref.id;
      return await ref.set({ id, name: technology });
    });
  }

  describe('Test with some existing technologies in the project document', () => {
    let snapshot: any;
    beforeEach(async () => {
      snapshot = test.firestore.makeDocumentSnapshot(
        TEST_PROJECT_DOC_1,
        `projects/${TEST_PROJECT_DOC_1.id}`
      );
      return await addTestTechnologies(['angular', 'react']);
    });

    it('Should add the typescript technology', () => {
      fn(snapshot).then(async () => {
        return admin
          .firestore()
          .collection('technologies')
          .get()
          .then((querySnapshot) => {
            let docs = querySnapshot.docs.map((doc) => doc.data().name);
            expect(docs).to.deep.equal(['angular', 'react', 'typescript']);
          });
      });
    });
  });
});
