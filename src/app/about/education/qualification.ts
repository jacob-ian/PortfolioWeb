import { AbstractSubject } from './subject';

export interface AbstractQualification {
  getName(): string;
  getDescription(): string;
  getId(): string;
  getDateStart(): string;
  getDateEnd(): string;
  getUrl(): string;
  getSubjects(): AbstractSubject[];
}

export class Qualification implements AbstractQualification {
  getName(): string {
    throw new Error('Method not implemented.');
  }
  getDescription(): string {
    throw new Error('Method not implemented.');
  }
  getId(): string {
    throw new Error('Method not implemented.');
  }
  getDateStart(): string {
    throw new Error('Method not implemented.');
  }
  getDateEnd(): string {
    throw new Error('Method not implemented.');
  }
  getUrl(): string {
    throw new Error('Method not implemented.');
  }
  getSubjects(): AbstractSubject[] {
    throw new Error('Method not implemented.');
  }
}
