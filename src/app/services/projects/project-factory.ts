import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseObject } from '../database/database-object';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { Project } from './project';

export class ProjectFactory extends DatabaseObjectFactory {
  constructor(firestore: AngularFirestore) {
    super(firestore, '/projects');
  }

  protected createDatabaseObject(doc: any): DatabaseObject {
    return new Project(this.firestore, doc);
  }
}
