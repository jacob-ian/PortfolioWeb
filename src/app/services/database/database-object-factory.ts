import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exception } from '../exception';
import { DatabaseObject } from './database-object';
import { DatabaseService } from './database.service';

const EMPTY_ARRAY: DatabaseObject[] = [];

export abstract class DatabaseObjectFactory {
  constructor(protected database: DatabaseService) {}

  public createFromCollection(
    collection: Observable<unknown[]>
  ): Observable<DatabaseObject[]> {
    return this.convertDocsToDatabaseObjects(collection);
  }

  private convertDocsToDatabaseObjects(
    documents: Observable<unknown[]>
  ): Observable<DatabaseObject[]> {
    try {
      return documents.pipe(map((docs) => this.mapDocsToDatabaseObjects(docs)));
    } catch (error) {
      throw new Exception(
        'DB',
        'internal',
        'Could not create an observable from the collection',
        error
      );
    }
  }

  private mapDocsToDatabaseObjects(docs: unknown[]): DatabaseObject[] {
    if (this.docsExist(docs)) {
      return docs.map((doc) => this.createDatabaseObject(doc));
    }
    return EMPTY_ARRAY;
  }

  private docsExist(docs: any[]): boolean {
    return docs.length > 0;
  }

  protected abstract createDatabaseObject(document: any): DatabaseObject;
}
