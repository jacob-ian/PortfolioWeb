import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DatabaseObjectFactory } from 'src/app/services/database/database-object-factory';
import { Qualification } from 'src/app/services/education/qualification';
import { QualificationFactory } from 'src/app/services/education/qualification-factory';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private qualificationFactory: DatabaseObjectFactory;

  constructor(private firestore: AngularFirestore) {
    this.qualificationFactory = new QualificationFactory(this.firestore);
  }

  public getQualifications(): Observable<Qualification[]> {
    return this.qualificationFactory.createFromCollection() as Observable<
      Qualification[]
    >;
  }
}
