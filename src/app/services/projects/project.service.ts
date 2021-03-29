import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from './project';
import { ProjectFactory } from './project-factory';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectFactory: ProjectFactory;

  constructor(private firestore: AngularFirestore) {
    this.projectFactory = new ProjectFactory(this.firestore);
  }

  public getProjects(): Observable<Project[]> {
    return this.projectFactory.createFromCollection() as Observable<Project[]>;
  }
}
