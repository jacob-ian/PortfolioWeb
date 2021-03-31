import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MockFirestore } from '../database/mock-firestore';
import { Project, ProjectDocument } from './project';
import { ProjectService } from './project.service';

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

const TEST_DOCS_EMPTY = [];

describe('ProjectService', () => {
  let service: ProjectService;
  let mockFirestore: any;

  describe('Test getting existing Project documents', () => {
    beforeEach(() => {
      mockFirestore = new MockFirestore(TEST_PROJECT_DOCS);
      TestBed.configureTestingModule({
        providers: [{ provide: AngularFirestore, useValue: mockFirestore }],
      });
      service = TestBed.inject(ProjectService);
    });

    it('Should return an observable', () => {
      let observable = service.getProjects();
      expect(observable).toBeInstanceOf(Observable);
    });

    it('Should return a non empty array inside the observable', () => {
      let observable = service.getProjects();
      observable.subscribe((projects) => {
        expect(projects.length).toBeTruthy();
      });
    });

    it('Should have Projects inside the array', () => {
      let observable = service.getProjects();
      observable.subscribe((projects) => {
        expect(projects[0]).toBeInstanceOf(Project);
      });
    });
  });

  describe('Test without existing documents', () => {
    let observable: Observable<Project[]>;
    beforeEach(() => {
      mockFirestore = new MockFirestore(TEST_DOCS_EMPTY);
      TestBed.configureTestingModule({
        providers: [{ provide: AngularFirestore, useValue: mockFirestore }],
      });
      service = TestBed.inject(ProjectService);
      observable = service.getProjects();
    });

    it('Should return an observable', () => {
      expect(observable).toBeInstanceOf(Observable);
    });

    it('Should return an empty array in the observable', () => {
      observable.subscribe((projects) => {
        expect(projects.length).toBeFalsy();
      });
    });
  });
});
