import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseObject } from '../database/database-object';
import { DatabaseObjectFactory } from '../database/database-object-factory';
import { Subject } from './subject';

export class SubjectFactory extends DatabaseObjectFactory {
  constructor(firestore: AngularFirestore, qualificationId: string) {
    super(firestore, `qualifications/${qualificationId}/subjects`);
  }

  protected createDatabaseObject(doc: any): DatabaseObject {
    return new Subject(this.firestore, doc);
  }
}
