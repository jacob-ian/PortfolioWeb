import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { DatabaseService } from '../database/database.service';
import { LoggerService } from '../logger.service';
import { Projects, Technologies } from '@shared/projects';
import { Project } from './project';
import { ProjectFactory } from './project-factory';
import { Technology } from './technology';
import { TechnologyFactory } from './technology-factory';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private dbObjectFactory: DatabaseObjectFactory;

  constructor(
    private database: DatabaseService,
    private logger: LoggerService
  ) {}

  public getProjects(): Observable<Project[]> {
    this.dbObjectFactory = new ProjectFactory(this.database);
    let collection = this.database.getCollection<Projects.Document>('projects');
    return this.createProjectsFromCollection(collection);
  }

  private createProjectsFromCollection(
    collection: Observable<Projects.Document[]>
  ): Observable<Project[]> {
    try {
      return this.dbObjectFactory.createFromCollection(
        collection
      ) as Observable<Project[]>;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getTechnologies(): Observable<string[]> {
    this.dbObjectFactory = new TechnologyFactory(this.database);
    let collection = this.database.getCollection<Technologies.Document>(
      'technologies'
    );
    return this.createTechnologiesFromCollection(collection);
  }

  private createTechnologiesFromCollection(
    collection: Observable<Technologies.Document[]>
  ): Observable<string[]> {
    try {
      let technologies = this.dbObjectFactory.createFromCollection(
        collection
      ) as Observable<Technology[]>;
      return this.convertTechnologyToString(technologies);
    } catch (error) {
      this.logger.error(error);
    }
  }

  private convertTechnologyToString(
    technologies: Observable<Technology[]>
  ): Observable<string[]> {
    return technologies.pipe(
      map((technologies) => this.getNameFromTechnologies(technologies))
    );
  }

  private getNameFromTechnologies(technologies: Technology[]): string[] {
    return technologies.map((tech) => tech.getName());
  }
}
