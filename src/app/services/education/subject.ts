import { DatabaseObject } from '../database/database-object';
import { DatabaseService } from '../database/database.service';
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

  constructor(database: DatabaseService);
  constructor(database: DatabaseService, document: SubjectDocument);
  constructor(database: DatabaseService, document?: SubjectDocument) {
    super(database);
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
