import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
import { Project } from '../services/projects/project';
import { ProjectService } from '../services/projects/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements OnInit {
  private filter: BehaviorSubject<string[]>;

  constructor(
    private projectService: ProjectService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.filter = new BehaviorSubject([]);
  }

  public onFilter(filter: string[]): void {
    this.filter.next(filter);
  }

  public getFilteredProjects(): Observable<Project[]> {
    let combinedObservable = this.createFilteredProjectsObservable();
    return combinedObservable;
  }

  private createFilteredProjectsObservable(): Observable<Project[]> {
    return combineLatest([
      this.getProjectsObservable(),
      this.getFilterObservable(),
    ]).pipe(
      map(([projects, technologies]) =>
        this.mergeProjectsTechnologies(projects, technologies)
      )
    );
  }

  private getProjectsObservable(): Observable<Project[]> {
    try {
      return this.projectService.getProjects();
    } catch (error) {
      this.logger.error(error);
    }
  }

  private getFilterObservable(): Observable<string[]> {
    return this.filter.asObservable();
  }

  private mergeProjectsTechnologies(
    projects: Project[],
    technologies: string[]
  ): Project[] {
    if (this.noProjects(projects) || this.noTechnologies(technologies)) {
      return projects;
    }

    return this.filterProjectsWithTechnologies(projects, technologies);
  }

  private noProjects(projects: Project[]) {
    return projects.length === 0;
  }

  private noTechnologies(technologies: string[]) {
    return technologies.length === 0;
  }

  private filterProjectsWithTechnologies(
    projects: Project[],
    technologies: string[]
  ): Project[] {
    let filteredProjects = [];
    projects.forEach((project) => {
      if (project.usesTechnologies(technologies)) {
        filteredProjects.push(project);
      }
    });
    return filteredProjects;
  }
}
