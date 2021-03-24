import { EducationException } from './education-exception';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseObject } from 'src/app/services/database/database-object';
import { Subject } from './subject';
import { Observable } from 'rxjs';
import { SubjectFactory } from './subject-factory';

export interface QualificationDocument {
  id: string;
  name: string;
  description: string;
  dateStart: number;
  dateEnd: number;
  handbookUrl: string;
  institution: Institution;
}

interface Institution {
  name: string;
  location: string;
  url: string;
  imageUrl: string;
}

export class Qualification extends DatabaseObject {
  private id: string;
  private name: string;
  private description: string;
  private dateStart: number;
  private dateEnd: number;
  private handbookUrl: string;
  private institution: Institution;

  constructor(firestore: AngularFirestore);
  constructor(firestore: AngularFirestore, documentId: string);
  constructor(firestore: AngularFirestore, document: QualificationDocument);
  constructor(
    firestore: AngularFirestore,
    idOrDocument?: string | QualificationDocument
  ) {
    super(firestore);

    this.name = null;
    this.description = null;
    this.dateStart = null;
    this.dateEnd = null;
    this.handbookUrl = null;
    this.institution = null;

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

      this.validateData();
      return;
    }
  }

  private createId(): string {
    return this.firestore.createId();
  }

  private inputIsId(input: string | QualificationDocument): input is string {
    return typeof input === 'string';
  }

  private inputIsQualificationDoc(
    input: QualificationDocument
  ): input is QualificationDocument {
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
      return this.formatDateToMonthYear(this.dateStart);
    }
    throw new EducationException(
      'invalid-input',
      "Qualification starting date isn't defined."
    );
  }

  private formatDateToMonthYear(dateMilliseconds: number): string {
    let date = new Date(dateMilliseconds);
    let monthNum = date.getMonth();
    let month = this.convertMonthNumToLetters(monthNum);
    let year = date.getFullYear();
    return `${month} ${year}`;
  }

  private convertMonthNumToLetters(monthNumber: number): string {
    if (monthNumber < 0 || monthNumber > 11) {
      throw new EducationException(
        'invalid-input',
        'Date month number out of range.'
      );
    }

    let months = {
      0: 'jan',
      1: 'feb',
      2: 'mar',
      3: 'apr',
      4: 'may',
      5: 'jun',
      6: 'jul',
      7: 'aug',
      8: 'sep',
      9: 'oct',
      10: 'nov',
      11: 'dec',
    };

    return months[monthNumber];
  }

  public getDateEnd(): string {
    if (this.dateEnd) {
      if (this.endDateIsInFuture()) {
        return 'now';
      } else {
        return this.formatDateToMonthYear(this.dateEnd);
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

  public getInstitution(): Institution {
    if (this.institution) {
      return this.institution;
    }
    throw new EducationException(
      'invalid-input',
      "Qualification institution isn't defined."
    );
  }

  public getSubjects(): Observable<Subject[]> {
    if (!this.id) {
      throw new EducationException(
        'invalid-input',
        'The Qualification ID is required to fetch its Subjects.'
      );
    }
    this.subcollectionFactory = new SubjectFactory(this.firestore, this.id);
    return super.getSubcollection() as Observable<Subject[]>;
  }
}
