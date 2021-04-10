import { DatabaseObject } from '../database/database-object';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { DatabaseService } from '../database/database.service';
import { Qualification } from './qualification';

export class QualificationFactory extends DatabaseObjectFactory {
  constructor(database: DatabaseService) {
    super(database);
  }

  protected createDatabaseObject(doc: any): DatabaseObject {
    return new Qualification(this.database, doc);
  }
}
