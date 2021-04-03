import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProjectService } from 'src/app/services/projects/project.service';
import { ProjectsFilterComponent } from './projects-filter.component';

describe('ProjectsFilterComponent', () => {
  let component: ProjectsFilterComponent;
  let fixture: ComponentFixture<ProjectsFilterComponent>;

  let technologies: string[] = ['angular', 'react', 'typescript', 'tdd'];

  let fakeService = {
    getTechnologies: () => of(technologies),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsFilterComponent],
      providers: [{ provide: ProjectService, useValue: fakeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test getting the technologies', () => {
    it('Should return the technologies', () => {
      component.getTechnologies().subscribe((tech) => {
        expect(tech).toBe(technologies);
      });
    });
  });

  describe('Test emitting the array of technologies', () => {
    it('Should return angular in an array', () => {
      component.filterTo.subscribe((value: string[]) => {
        expect(value).toEqual(['angular']);
      });
      component.onSelectChange(['angular']);
    });
  });
});
