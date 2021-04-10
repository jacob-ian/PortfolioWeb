import { DatabaseObject } from '../database/database-object';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { DatabaseService } from '../database/database.service';
import { Technology } from './technology';

export class TechnologyFactory extends DatabaseObjectFactory {
  constructor(database: DatabaseService) {
    super(database);
  }

  protected createDatabaseObject(doc: any): DatabaseObject {
    return new Technology(this.database, doc);
  }
}
