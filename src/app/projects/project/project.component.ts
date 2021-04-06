import { Component, Input, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';
import { Project, ProjectUrl } from 'src/app/services/projects/project';
import { ProjectException } from 'src/app/services/projects/project-exception';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass'],
})
export class ProjectComponent implements OnInit {
  @Input('project') private project: Project;
  public isLinksExpanded: boolean = false;

  constructor(private logger: LoggerService) {}

  ngOnInit(): void {}

  public getName(): string {
    try {
      return this.project.getName();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getLinks(): ProjectUrl[] {
    try {
      return this.project.getLinks();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getDescription(): string {
    try {
      return this.project.getDescription();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getTechnologies(): string[] {
    try {
      return this.project.getTechnologies();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getIconUrl(): string {
    try {
      return this.project.getIconUrl();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getStatus(): 'ongoing' | 'finished' {
    try {
      return this.project.getStatus();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public showLinks(show: boolean) {
    this.isLinksExpanded = show;
  }

  public getDateStartMs(): number {
    try {
      return this.project.getDateStartMs();
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * TESTING ONLY
   */
  public setProject(project: Project): void {
    if (environment.production) {
      throw new ProjectException(
        'internal',
        'Cannot use testing methods in production.'
      );
    }
    this.project = project;
  }
}
