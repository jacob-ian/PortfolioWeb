import { AngularFirestore } from '@angular/fire/firestore';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.firestore
      .collection(this.path)
      .valueChanges()
      .pipe(map((docs) => this.createDatabaseObjectsFromDocs(docs)));
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
