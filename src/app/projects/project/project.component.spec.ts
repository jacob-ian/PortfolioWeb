import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Projects } from '@shared/projects';
import { Project } from 'src/app/services/projects/project';

import { ProjectComponent } from './project.component';

const TEST_PROJECT_DOC_ONGOING: Projects.Document = {
  id: '1',
  name: 'website1',
  description: 'another website',
  technologies: ['angular', 'javascript', 'typescript', 'react'],
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
};

const TEST_PROJECT_DOC_FINISHED: Projects.Document = {
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
  dateStart: new Date('01 Feb 2021').getTime(),
  status: 'finished',
};

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let mockDatabase: any = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectComponent],
    }).compileComponents();
  });

  describe('Test with an ongoing project', () => {
    let project: Project;
    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectComponent);
      component = fixture.componentInstance;
      project = new Project(mockDatabase, TEST_PROJECT_DOC_ONGOING);
      component.setProject(project);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should render the name', () => {
      let nameElement = fixture.debugElement.query(By.css('.name'))
        .nativeElement;
      let name = nameElement.innerText;
      expect(name).toBe(project.getName());
    });

    it('Should render the ongoing status', () => {
      let statusDiv: HTMLElement = fixture.debugElement.query(By.css('.status'))
        .nativeElement;

      let status = statusDiv.innerText;
      expect(status).toBe(project.getStatus());
    });

    it('Status background color should be yellow', () => {
      let yellow = 'rgba(230, 208, 36, 0.54)';
      let statusDiv: HTMLElement = fixture.debugElement.query(By.css('.status'))
        .nativeElement;
      let style = getComputedStyle(statusDiv);
      let backgroundColor = style.backgroundColor;
      expect(backgroundColor).toBe(yellow);
    });

    it('Status check icon should be unchecked', () => {
      let hiddenColor = 'rgb(255, 255, 255)';
      let statusDiv: HTMLElement = fixture.debugElement.query(By.css('.status'))
        .nativeElement;
      let svgPath = statusDiv.querySelector('#check');
      let style = getComputedStyle(svgPath);
      let fill = style.fill;
      expect(fill).toBe(hiddenColor);
    });

    it('Should render the description', () => {
      let descriptionElement: HTMLElement = fixture.debugElement.query(
        By.css('.description')
      ).nativeElement;
      let description = descriptionElement.innerText;
      expect(description).toBe(project.getDescription());
    });

    it('Should render 4 technology tags', () => {
      let technologies = fixture.debugElement.queryAll(By.css('.technology'));
      expect(technologies.length).toBe(4);
    });

    it('Should render the 4 technologies', () => {
      let technologies = fixture.debugElement.queryAll(By.css('.technology'));
      let names = technologies.map(
        (technology) => technology.nativeElement.innerText
      );
      expect(names).toEqual(TEST_PROJECT_DOC_ONGOING.technologies);
    });

    it('Should have the links hidden', () => {
      let linksDiv: HTMLElement = fixture.debugElement.query(By.css('.links'))
        .nativeElement;
      let style = getComputedStyle(linksDiv);
      let display = style.display;
      expect(display).toBe('none');
    });

    it('Should have the links shown after clicking the expand button', () => {
      component.showLinks(true);
      fixture.detectChanges();
      let linksDiv: HTMLElement = fixture.debugElement.query(By.css('.links'))
        .nativeElement;
      let style = getComputedStyle(linksDiv);
      let display = style.display;
      expect(display).toBe('flex');
    });

    it('Should render all the links', () => {
      let links = fixture.debugElement.queryAll(By.css('.link'));
      let names = links.map((link) => link.nativeElement.innerText.trim());
      let expectedNames = TEST_PROJECT_DOC_ONGOING.links.map(
        (link) => link.name
      );
      expect(names).toEqual(expectedNames);
    });
  });

  describe('Test with a finished project', () => {
    let project: Project;
    beforeEach(() => {
      fixture = TestBed.createComponent(ProjectComponent);
      component = fixture.componentInstance;
      project = new Project(mockDatabase, TEST_PROJECT_DOC_FINISHED);
      component.setProject(project);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should render the status', () => {
      let statusEl: HTMLElement = fixture.debugElement.query(By.css('.status'))
        .nativeElement;
      let status = statusEl.innerText;
      expect(status).toBe(project.getStatus());
    });

    it('Should render the status with a green background', () => {
      let green = 'rgba(36, 230, 36, 0.36)';
      let statusEl: HTMLElement = fixture.debugElement.query(By.css('.status'))
        .nativeElement;
      let style = getComputedStyle(statusEl);
      let backgroundColor = style.backgroundColor;
      expect(backgroundColor).toBe(green);
    });

    it('Should render the check mark in the status indicator', () => {
      let shownColor = 'rgb(0, 128, 0)';
      let statusEl: HTMLElement = fixture.debugElement.query(By.css('.status'))
        .nativeElement;
      let svgPath: HTMLElement = statusEl.querySelector('#check');
      let style = getComputedStyle(svgPath);
      let fill = style.fill;
      expect(fill).toBe(shownColor);
    });
  });
});
