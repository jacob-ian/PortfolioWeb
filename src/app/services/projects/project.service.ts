import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { LoggerService } from '../logger.service';
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
    private firestore: AngularFirestore,
    private logger: LoggerService
  ) {}

  public getProjects(): Observable<Project[]> {
    this.dbObjectFactory = new ProjectFactory(this.firestore);
    return this.createProjectsFromCollection();
  }

  private createProjectsFromCollection(): Observable<Project[]> {
    try {
      return this.dbObjectFactory.createFromCollection() as Observable<
        Project[]
      >;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getTechnologies(): Observable<string[]> {
    this.dbObjectFactory = new TechnologyFactory(this.firestore);
    return this.createTechnologiesFromCollection();
  }

  private createTechnologiesFromCollection(): Observable<string[]> {
    try {
      let technologies = this.dbObjectFactory.createFromCollection() as Observable<
        Technology[]
      >;
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
