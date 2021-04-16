import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { MockDatabaseService } from '../database/mock-database-service';
import { Project } from './project';
import { Projects, Technologies } from '@shared/projects';
import { ProjectService } from './project.service';

const TEST_PROJECT_DOCS: Projects.Document[] = [
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

const TEST_TECH_DOCS: Technologies.Document[] = [
  { id: '1', name: 'angular', projects: [] },
  { id: '2', name: 'react', projects: [] },
];

const TEST_DOCS_EMPTY = [];

describe('ProjectService', () => {
  let service: ProjectService;
  let mockDatabase: any;

  describe('Test getting Projects', () => {
    describe('Test getting existing Project documents', () => {
      beforeEach(() => {
        mockDatabase = new MockDatabaseService(TEST_PROJECT_DOCS);
        TestBed.configureTestingModule({
          providers: [{ provide: DatabaseService, useValue: mockDatabase }],
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
        mockDatabase = new MockDatabaseService(TEST_DOCS_EMPTY);
        TestBed.configureTestingModule({
          providers: [{ provide: DatabaseService, useValue: mockDatabase }],
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

  describe('Test getting Technologies', () => {
    describe('Test with existing Technology documents', () => {
      beforeEach(() => {
        mockDatabase = new MockDatabaseService(TEST_TECH_DOCS);
        TestBed.configureTestingModule({
          providers: [{ provide: DatabaseService, useValue: mockDatabase }],
        });
        service = TestBed.inject(ProjectService);
      });

      it('Should return an observable', () => {
        let observable = service.getTechnologies();
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return a non empty array inside the observable', () => {
        let observable = service.getTechnologies();
        observable.subscribe((technologies) => {
          expect(technologies.length).toBeTruthy();
        });
      });

      it('Should have strings inside the array', () => {
        let observable = service.getTechnologies();
        observable.subscribe((technologies) => {
          expect(technologies[0]).toBe('angular');
        });
      });
    });

    describe('Test without existing documents', () => {
      let observable: Observable<string[]>;
      beforeEach(() => {
        mockDatabase = new MockDatabaseService(TEST_DOCS_EMPTY);
        TestBed.configureTestingModule({
          providers: [{ provide: DatabaseService, useValue: mockDatabase }],
        });
        service = TestBed.inject(ProjectService);
        observable = service.getTechnologies();
      });

      it('Should return an observable', () => {
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return an empty array in the observable', () => {
        observable.subscribe((technologies) => {
          expect(technologies.length).toBeFalsy();
        });
      });
    });
  });
});
