import { AbstractQualification, Qualification } from './qualification';

export interface AbstractInstitution {
  getName(): string;
  getLocation(): string;
  getImageUrl(): string;
  getId(): string;
  getInstitutionUrl(): string;
  getQualifications(): AbstractQualification[];
}

export interface InstitutionDocument {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  institutionUrl: string;
}

export class Institution implements AbstractInstitution {
  private name: string;
  private id: string;
  private location: string;
  private imageUrl: string;
  private institutionUrl: string;

  constructor();
  constructor(documnet: InstitutionDocument);
  constructor(document?: InstitutionDocument) {
    this.name = document?.name;
    this.id = document?.id;
    this.location = document?.location;
    this.imageUrl = document?.imageUrl;
    this.institutionUrl = document?.institutionUrl;
  }

  public getName(): string {
    return this.name;
  }
  public getLocation(): string {
    return this.location;
  }
  public getImageUrl(): string {
    return this.imageUrl;
  }
  public getId(): string {
    return this.id;
  }
  public getInstitutionUrl(): string {
    return this.institutionUrl;
  }
  public getQualifications(): Qualification[] {
    throw new Error('Method not implemented.');
  }
}
