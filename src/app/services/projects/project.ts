import { DatabaseObject } from '../database/database-object';
import { DatabaseService } from '../database/database.service';
import { Utils } from '../utils';
import { ProjectException } from './project-exception';
import { Projects } from '@shared/projects';

export class Project extends DatabaseObject {
  private id: string;
  private name: string;
  private description: string;
  private technologies: string[];
  private links: Projects.Link[];
  private dateStart: number;
  private status: 'finished' | 'ongoing';
  private dateEnd?: number;
  private iconUrl?: string;

  constructor(database: DatabaseService, document: Projects.Document) {
    super(database);

    if (this.documentIsValid) {
      this.id = document.id;
      this.name = document.name;
      this.description = document.description;
      this.technologies = document.technologies;
      this.links = document.links;
      this.dateStart = document.dateStart;
      this.status = document.status;
      this.dateEnd = document.dateEnd;
      this.iconUrl = document.iconUrl;
      return;
    }
    throw new ProjectException(
      'invalid-input',
      `The project document is invalid:\n${JSON.stringify(document)}.`
    );
  }

  private documentIsValid(document: Projects.Document): boolean {
    if (!document) {
      return false;
    }
    return !!(
      document.id &&
      document.name &&
      document.description &&
      document.technologies.length > 0 &&
      document.links.length > 0 &&
      document.dateStart &&
      document.status
    );
  }

  public getId(): string {
    if (!this.id) {
      throw new ProjectException(
        'invalid-input',
        'The Project ID is undefined'
      );
    }
    return this.id;
  }

  public getName(): string {
    if (!this.name) {
      throw new ProjectException(
        'invalid-input',
        'The Project name is undefined'
      );
    }
    return this.name;
  }

  public getDescription(): string {
    if (!this.description) {
      throw new ProjectException(
        'invalid-input',
        'The Project description is undefined'
      );
    }

    return this.description;
  }

  public getTechnologies(): string[] {
    if (!this.technologies) {
      throw new ProjectException(
        'invalid-input',
        'The Project description is undefined'
      );
    }
    return this.technologies;
  }

  public getLinks(): Projects.Link[] {
    if (!this.links) {
      throw new ProjectException(
        'invalid-input',
        'There are no project links defined.'
      );
    }
    return this.links;
  }

  public getDateStart(): string {
    if (!this.dateStart) {
      throw new ProjectException(
        'invalid-input',
        'The Project starting date is undefined'
      );
    }
    return Utils.formatTimeMsToMMMYYYY(this.dateStart);
  }

  public getDateStartMs(): number {
    if (!this.dateStart) {
      throw new ProjectException(
        'invalid-input',
        'The Project starting date is undefined'
      );
    }
    return this.dateStart;
  }

  public getStatus(): 'finished' | 'ongoing' {
    if (!this.status) {
      throw new ProjectException(
        'invalid-input',
        'The Project status is undefined'
      );
    }
    return this.status;
  }

  public getDateEnd(): string | null {
    if (!this.dateEnd) {
      return null;
    }
    return Utils.formatTimeMsToMMMYYYY(this.dateEnd);
  }

  public getDateEndMs(): number | null {
    if (!this.dateEnd) {
      return null;
    }
    return this.dateEnd;
  }

  public getIconUrl(): string | null {
    if (!this.iconUrl) {
      return null;
    }
    return this.iconUrl;
  }

  public usesTechnologies(technologies: string[]): boolean {
    if (this.canCompareTechnologies(technologies)) {
      return this.areTechnologiesUsed(technologies);
    }
    return false;
  }

  private canCompareTechnologies(query: string[]): boolean {
    return this.hasTechnologies() && this.techQueryNotEmpty(query);
  }

  private hasTechnologies(): boolean {
    return this.technologies && this.technologies.length > 0;
  }

  private techQueryNotEmpty(technologies: string[]): boolean {
    return technologies.length > 0;
  }

  private areTechnologiesUsed(technologies: string[]): boolean {
    const itemCount = technologies.length;
    let usedTechnologies = 0;
    let item = 0;
    let compare = true;

    while (compare && item < itemCount) {
      let technology = technologies[item];
      if (this.notUsed(technology)) {
        return false;
      }
      usedTechnologies++;
      item++;
    }

    let allAreUsed = usedTechnologies === item;
    return allAreUsed;
  }

  private notUsed(technology: string): boolean {
    return !this.technologies.includes(technology);
  }
}
