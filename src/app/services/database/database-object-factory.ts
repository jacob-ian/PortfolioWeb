import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatabaseObject } from './database-object';

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
    return docs.map((doc) => this.createDatabaseObject(doc));
  }

  protected abstract createDatabaseObject(document: any): DatabaseObject;
}
