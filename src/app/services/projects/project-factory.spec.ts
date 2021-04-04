import { Observable, of } from 'rxjs';
import { Project, ProjectDocument } from './project';
import { ProjectFactory } from './project-factory';

const TEST_PROJECT_DOCS: ProjectDocument[] = [
  {
    id: '1',
    name: 'website1',
    description: 'another website',
    technologies: ['angular', 'javascript', 'typescript'],
    links: [
      {
        name: 'GitHub Repo',
        url: 'https://github.com',
      },
      {
        name: 'Website',
        url: 'https://google.com',
      },
    ],
    dateStart: new Date('01 Mar 2021').getTime(),
    status: 'ongoing',
  },
  {
    id: '2',
    name: 'website2',
    description: 'another website',
    technologies: ['angular', 'javascript', 'typescript'],
    links: [
      {
        name: 'GitHub Repo',
        url: 'https://github.com',
      },
      {
        name: 'Website',
        url: 'https://google.com',
      },
    ],
    dateStart: new Date('01 Mar 2021').getTime(),
    status: 'ongoing',
  },
];
const TEST_EMPTY_DOCS: ProjectDocument[] = [];

describe('ProjectFactory', () => {
  let factory: ProjectFactory;
  let mockDatabase: any = {};

  describe('Test creating Projects', () => {
    describe('Test with existing documents', () => {
      let observable: Observable<any[]>;

      beforeEach(() => {
        factory = new ProjectFactory(mockDatabase);
        observable = factory.createFromCollection(of(TEST_PROJECT_DOCS));
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
          const testProj = new Project(mockDatabase, TEST_PROJECT_DOCS[0]);
          expect(projects[0]).toEqual(testProj);
        });
      });
    });

    describe('Test with no existing documents', () => {
      let observable: Observable<any[]>;

      beforeEach(() => {
        factory = new ProjectFactory(mockDatabase);
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
