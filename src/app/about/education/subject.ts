export interface AbstractSubject {
  getId(): string;
  getName(): string;
  getUrl(): string;
}

export interface SubjectDocument {}

export class Subject implements AbstractSubject {
  getId(): string {
    throw new Error('Method not implemented.');
  }
  getName(): string {
    throw new Error('Method not implemented.');
  }
  getUrl(): string {
    throw new Error('Method not implemented.');
  }
}
