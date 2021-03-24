import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseObject } from '../database/database-object';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { Qualification } from './qualification';

export class QualificationFactory extends DatabaseObjectFactory {
  constructor(firestore: AngularFirestore) {
    super(firestore, 'qualifications');
  }

  protected createDatabaseObject(doc: any): DatabaseObject {
    return new Qualification(this.firestore, doc);
  }
}
