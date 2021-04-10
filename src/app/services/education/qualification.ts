import { EducationException } from './education-exception';
import { DatabaseObject } from 'src/app/services/database/database-object';
import { Subject } from './subject';
import { Observable } from 'rxjs';
import { SubjectFactory } from './subject-factory';
import { Utils } from '../utils';
import { DatabaseService } from '../database/database.service';
import { Qualifications } from '@shared/education';

export class Qualification extends DatabaseObject {
  private id: string;
  private name: string;
  private description: string;
  private dateStart: number;
  private dateEnd: number;
  private handbookUrl: string;
  private institution: Qualifications.Institution;
  private credentialCategory: 'degree' | 'diploma' | 'certificate';
  private educationLevel: 'beginner' | 'intermediate' | 'advanced';

  constructor(database: DatabaseService);
  constructor(database: DatabaseService, documentId: string);
  constructor(database: DatabaseService, document: Qualifications.Document);
  constructor(
    database: DatabaseService,
    idOrDocument?: string | Qualifications.Document
  ) {
    super(database);

    this.name = null;
    this.description = null;
    this.dateStart = null;
    this.dateEnd = null;
    this.handbookUrl = null;
    this.institution = null;
    this.credentialCategory = null;
    this.educationLevel = null;

    if (!idOrDocument) {
      this.id = this.createId();
      return;
    }

    if (this.inputIsId(idOrDocument)) {
      this.id = idOrDocument;
      return;
    }

    if (this.inputIsQualificationDoc(idOrDocument)) {
      this.id = idOrDocument.id;
      this.name = idOrDocument.name;
      this.description = idOrDocument.description;
      this.dateStart = idOrDocument.dateStart;
      this.dateEnd = idOrDocument.dateEnd;
      this.handbookUrl = idOrDocument.handbookUrl;
      this.institution = idOrDocument.institution;
      this.credentialCategory = idOrDocument.credentialCategory;
      this.educationLevel = idOrDocument.educationLevel;

      this.validateData();
      return;
    }
  }

  private inputIsId(input: string | Qualifications.Document): input is string {
    return typeof input === 'string';
  }

  private inputIsQualificationDoc(
    input: Qualifications.Document
  ): input is Qualifications.Document {
    return !!(
      input.id &&
      input.name &&
      input.description &&
      input.dateStart &&
      input.dateEnd &&
      input.handbookUrl &&
      input.institution
    );
  }

  private validateData(): void {
    if (this.dateStart > this.dateEnd) {
      throw new EducationException(
        'invalid-input',
        'Qualification starting date cannot be later than ending date.'
      );
    }
  }

  public getName(): string {
    if (this.name) {
      return this.name;
    }
    throw new EducationException(
      'invalid-input',
      "Qualification name isn't defined."
    );
  }

  public getDescription(): string {
    if (this.description) {
      return this.description;
    }
    throw new EducationException(
      'invalid-input',
      "Qualification description isn't defined."
    );
  }

  public getId(): string {
    if (this.id) {
      return this.id;
    }
    throw new EducationException(
      'invalid-input',
      "Qualification ID isn't defined."
    );
  }

  public getDateStart(): string {
    if (this.dateStart) {
      return Utils.formatTimeMsToMMMYYYY(this.dateStart);
    }
    throw new EducationException(
      'invalid-input',
      "Qualification starting date isn't defined."
    );
  }

  public getDateEnd(): string {
    if (this.dateEnd) {
      if (this.endDateIsInFuture()) {
        return 'now';
      } else {
        return Utils.formatTimeMsToMMMYYYY(this.dateEnd);
      }
    }
    throw new EducationException(
      'invalid-input',
      "Qualification end date isn't defined."
    );
  }

  public getDateEndMilliseconds(): number {
    if (this.dateEnd) {
      return this.dateEnd;
    }
    throw new EducationException(
      'invalid-input',
      "Qualification end date isn't defined."
    );
  }

  private endDateIsInFuture(): boolean {
    return this.dateEnd > Date.now();
  }

  public getUrl(): string {
    if (this.handbookUrl) {
      return this.handbookUrl;
    }
    throw new EducationException(
      'invalid-input',
      "Qualification URL isn't defined."
    );
  }

  public getInstitution(): Qualifications.Institution {
    if (this.institution) {
      return this.institution;
    }
    throw new EducationException(
      'invalid-input',
      "Qualification institution isn't defined."
    );
  }

  public getSubjects(): Observable<Subject[]> {
    this.subcollectionFactory = new SubjectFactory(this.database);
    let path = this.createSubjectsPath();
    return this.getSubcollection(path) as Observable<Subject[]>;
  }

  private createSubjectsPath(): string {
    return `qualifications/${this.getId()}/subjects`;
  }

  public getCredentialCateogry(): string {
    if (!this.credentialCategory) {
      throw new EducationException(
        'invalid-input',
        'The Qualification Credential Category is undefined'
      );
    }
    return this.credentialCategory;
  }

  public getEducationLevel(): string {
    if (!this.educationLevel) {
      throw new EducationException(
        'invalid-input',
        'The Qualification education level is undefined.'
      );
    }
    return this.educationLevel;
  }
}
