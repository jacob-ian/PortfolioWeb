import { Observable } from 'rxjs';
import { MockFirestore } from '../database/mock-firestore';
import { Project, ProjectDocument } from './project';
import { ProjectFactory } from './project-factory';

const TEST_PROJECT_DOCS: ProjectDocument[] = [
  {
    id: '1',
    name: 'website1',
    description: 'another website',
    technologies: ['angular', 'javascript', 'typescript'],
    repoUrl: 'https://github.com',
    dateStart: new Date('01 Mar 2021').getTime(),
    status: 'ongoing',
  },
  {
    id: '2',
    name: 'website2',
    description: 'another website',
    technologies: ['angular', 'javascript', 'typescript'],
    repoUrl: 'https://github.com',
    dateStart: new Date('01 Mar 2021').getTime(),
    status: 'ongoing',
  },
];
const TEST_EMPTY_DOCS: ProjectDocument[] = [];

describe('ProjectFactory', () => {
  let factory: ProjectFactory;
  let mockFirestore: any;

  describe('Test creating Projects', () => {
    describe('Test with existing documents', () => {
      let observable: Observable<any[]>;

      beforeEach(() => {
        mockFirestore = new MockFirestore(TEST_PROJECT_DOCS);
        factory = new ProjectFactory(mockFirestore);
        observable = factory.createFromCollection();
      });

      it('Should return an observable', () => {
        expect(observable).toBeTruthy();
      });

      it('Should have an array of Projects in the observable', () => {
        observable.subscribe((projects) => {
          expect(projects[0]).toBeInstanceOf(Project);
        });
      });

      it('Should return a test Project in the array', () => {
        observable.subscribe((projects) => {
          const testProj = new Project(mockFirestore, TEST_PROJECT_DOCS[0]);
          expect(projects[0]).toEqual(testProj);
        });
      });
    });

    describe('Test with no existing documents', () => {
      let observable: Observable<any[]>;

      beforeEach(() => {
        mockFirestore = new MockFirestore(TEST_EMPTY_DOCS);
        factory = new ProjectFactory(mockFirestore);
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
