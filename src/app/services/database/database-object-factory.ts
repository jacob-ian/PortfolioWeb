import { AngularFirestore } from '@angular/fire/firestore';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Exception } from '../exception';
import { DatabaseObject } from './database-object';

const EMPTY_ARRAY: DatabaseObject[] = [];

export abstract class DatabaseObjectFactory {
  protected firestore: AngularFirestore;
  protected path: string;

  constructor(firestore: AngularFirestore, path: string) {
    this.firestore = firestore;
    this.path = path;
  }

  public createFromCollection(): Observable<DatabaseObject[]> {
    try {
      return this.firestore
        .collection(this.path)
        .valueChanges()
        .pipe(map((docs) => this.createDatabaseObjectsFromDocs(docs)));
    } catch (error) {
      throw new Exception(
        'DB',
        'internal',
        'Could not create from collection',
        error
      );
    }
  }

  protected createDatabaseObjectsFromDocs(docs: any[]): DatabaseObject[] {
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
