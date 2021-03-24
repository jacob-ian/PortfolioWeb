import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DatabaseObjectFactory } from './database-object-factory';

export abstract class DatabaseObject {
  protected firestore: AngularFirestore;
  protected subcollectionFactory: DatabaseObjectFactory;

  constructor(firestore: AngularFirestore) {
    this.firestore = firestore;
    this.subcollectionFactory = null;
  }

  protected getSubcollection(): Observable<DatabaseObject[]> {
    return this.subcollectionFactory.createFromCollection();
  }
}
