import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Project, ProjectDocument } from '../services/projects/project';
import { ProjectService } from '../services/projects/project.service';
import { ProjectsComponent } from './projects.component';

const TEST_PROJECT_DOC_1: ProjectDocument = {
  id: '1',
  name: 'website1',
  description: 'another website',
  technologies: ['angular', 'javascript', 'typescript', 'react'],
  repoUrl: 'https://github.com',
  dateStart: new Date('01 Mar 2021').getTime(),
  status: 'ongoing',
};

const TEST_PROJECT_DOC_2: ProjectDocument = {
  id: '2',
  name: 'website2',
  description: 'another website',
  technologies: ['angular', 'javascript', 'typescript'],
  repoUrl: 'https://github.com',
  dateStart: new Date('01 Mar 2021').getTime(),
  status: 'ongoing',
};

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let mockFirestore: any = {};

  const TEST_PROJECTS: Project[] = [
    new Project(mockFirestore, TEST_PROJECT_DOC_1),
    new Project(mockFirestore, TEST_PROJECT_DOC_2),
  ];

  let fakeService: any = {
    getProjects: () => of(TEST_PROJECTS),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      providers: [{ provide: ProjectService, useValue: fakeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test getting the filtered projects observable', () => {
    describe('Test getting with an empty filter', () => {
      beforeEach(() => {
        component.onFilter([]);
      });

      it('Should return the test projects array', () => {
        component.getFilteredProjects().subscribe((projects) => {
          expect(projects).toBe(TEST_PROJECTS);
        });
      });
    });

    describe('Test getting projects with a filtered technology', () => {
      beforeEach(() => {
        component.onFilter(['react']);
      });

      it('Should have an array with length of 1', () => {
        component.getFilteredProjects().subscribe((projects) => {
          expect(projects.length).toBe(1);
        });
      });

      it('Should return the first test project in the array', () => {
        component.getFilteredProjects().subscribe((projects) => {
          expect(projects[0]).toEqual(TEST_PROJECTS[0]);
        });
      });
    });

    describe('Test getting projects with a few filters', () => {
      beforeEach(() => {
        component.onFilter(['angular', 'typescript', 'javascript']);
      });

      it('Should return the test projects in the array', () => {
        component.getFilteredProjects().subscribe((projects) => {
          expect(projects).toEqual(TEST_PROJECTS);
        });
      });
    });

    describe('Test getting projects with a technology not in the array', () => {
      beforeEach(() => {
        component.onFilter(['express']);
      });

      it('Should return an empty array', () => {
        component.getFilteredProjects().subscribe((projects) => {
          expect(projects.length).toBe(0);
        });
      });
    });
  });

  describe('Test the onFilter method', () => {
    let filteredProjects: Observable<Project[]>;
    beforeEach(() => {
      filteredProjects = component.getFilteredProjects();
    });

    it('Should reduce the filtered projects to one item', () => {
      component.onFilter(['react']);
      filteredProjects.subscribe((projects) => {
        expect(projects.length).toBe(1);
      });
    });
  });
});
