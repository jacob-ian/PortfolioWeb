import { Observable } from 'rxjs';
import { DatabaseObjectFactory } from './database-object-factory';
import { DatabaseService } from './database.service';

export abstract class DatabaseObject {
  protected subcollectionFactory: DatabaseObjectFactory;

  constructor(protected database: DatabaseService) {}

  protected createId(): string {
    return this.database.createId();
  }

  protected getSubcollection(path: string): Observable<DatabaseObject[]> {
    let collection = this.database.getCollection(path);
    return this.subcollectionFactory.createFromCollection(collection);
  }
}
