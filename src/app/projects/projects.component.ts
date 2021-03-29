import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { Project } from '../services/projects/project';
import { ProjectService } from '../services/projects/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements OnInit {
  private projects: Observable<Project[]>;

  constructor(
    private projectService: ProjectService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {}

  public getProjects(): Observable<Project[]> {
    if (!this.projects) {
      this.fetchProjectsFromService();
      this.sortProjects();
    }
    return this.projects;
  }

  private fetchProjectsFromService(): void {
    try {
      this.projects = this.projectService.getProjects();
    } catch (error) {
      this.logger.error(error);
    }
  }

  private sortProjects(): void {}
}
