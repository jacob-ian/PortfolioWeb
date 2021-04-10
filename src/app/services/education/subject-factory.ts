import { DatabaseObject } from '../database/database-object';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { DatabaseService } from '../database/database.service';
import { Subject } from './subject';

export class SubjectFactory extends DatabaseObjectFactory {
  constructor(database: DatabaseService) {
    super(database);
  }

  protected createDatabaseObject(doc: any): DatabaseObject {
    return new Subject(this.database, doc);
  }
}
