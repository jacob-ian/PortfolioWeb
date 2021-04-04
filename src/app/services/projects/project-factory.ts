import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseObject } from '../database/database-object';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { DatabaseService } from '../database/database.service';
import { Project } from './project';

export class ProjectFactory extends DatabaseObjectFactory {
  constructor(database: DatabaseService) {
    super(database);
  }

  protected createDatabaseObject(document: any): DatabaseObject {
    return new Project(this.database, document);
  }
}
