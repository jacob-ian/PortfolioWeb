import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseObject } from '../database/database-object';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { Technology } from './technology';

export class TechnologyFactory extends DatabaseObjectFactory {
  constructor(firestore: AngularFirestore) {
    super(firestore, 'technologies');
  }

  protected createDatabaseObject(document: any): DatabaseObject {
    return new Technology(this.firestore, document);
  }
}
