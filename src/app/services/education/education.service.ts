import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseObjectFactory } from 'src/app/services/database/database-object-factory';
import { Qualifications } from '@shared/education';
import { Qualification } from 'src/app/services/education/qualification';
import { QualificationFactory } from 'src/app/services/education/qualification-factory';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private qualificationFactory: DatabaseObjectFactory;

  constructor(private database: DatabaseService) {
    this.qualificationFactory = new QualificationFactory(this.database);
  }

  public getQualifications(): Observable<Qualification[]> {
    let collection = this.database.getCollection<Qualifications.Document>(
      'qualifications'
    );
    return this.qualificationFactory.createFromCollection(
      collection
    ) as Observable<Qualification[]>;
  }
}
