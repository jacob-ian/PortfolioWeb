import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseObject } from '../database/database-object';
import { EducationException } from './education-exception';

export interface SubjectDocument {
  id: string;
  name: string;
  handbookUrl: string;
}

export class Subject extends DatabaseObject {
  private id: string;
  private name: string;
  private handbookUrl: string;

  constructor(firestore: AngularFirestore);
  constructor(firestore: AngularFirestore, document: SubjectDocument);
  constructor(firestore: AngularFirestore, document?: SubjectDocument) {
    super(firestore);
    if (document) {
      this.id = document.id;
      this.name = document.name;
      this.handbookUrl = document.handbookUrl;
    }
  }
  public getId(): string {
    if (!this.id) {
      throw new EducationException(
        'invalid-input',
        'The "id" variable is undefined.'
      );
    }
    return this.id;
  }
  public getName(): string {
    if (!this.name) {
      throw new EducationException(
        'invalid-input',
        'The "name" variable is undefined.'
      );
    }
    return this.name;
  }
  public getUrl(): string {
    if (!this.handbookUrl) {
      throw new EducationException(
        'invalid-input',
        'The "handbookUrl" variable is undefined.'
      );
    }
    return this.handbookUrl;
  }
}
