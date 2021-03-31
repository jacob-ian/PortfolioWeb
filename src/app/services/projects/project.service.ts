import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { Project } from './project';
import { ProjectFactory } from './project-factory';
import { Technology } from './technology';
import { TechnologyFactory } from './technology-factory';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private dbObjectFactory: DatabaseObjectFactory;

  constructor(private firestore: AngularFirestore) {}

  public getProjects(): Observable<Project[]> {
    this.dbObjectFactory = new ProjectFactory(this.firestore);
    return this.dbObjectFactory.createFromCollection() as Observable<Project[]>;
  }

  public getTechnologies(): Observable<string[]> {
    this.dbObjectFactory = new TechnologyFactory(this.firestore);
    let technologies = this.dbObjectFactory.createFromCollection() as Observable<
      Technology[]
    >;
    return this.convertTechnologyToString(technologies);
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
