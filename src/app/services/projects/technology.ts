import { DatabaseObject } from '../database/database-object';
import { DatabaseService } from '../database/database.service';
import { ProjectException } from './project-exception';

export interface TechnologyDocument {
  id: string;
  name: string;
}

export class Technology extends DatabaseObject {
  private id: string;
  private name: string;

  constructor(database: DatabaseService, document: TechnologyDocument) {
    super(database);

    if (this.isDocument(document)) {
      this.id = document.id;
      this.name = document.name;
      return;
    }

    this.id = this.createId();
  }

  private isDocument(doc: TechnologyDocument): doc is TechnologyDocument {
    if (!doc) {
      return false;
    }
    return !!(doc.id && doc.name);
  }

  public getId(): string {
    if (!this.id) {
      throw new ProjectException(
        'invalid-input',
        'Technology ID is undefined.'
      );
    }
    return this.id;
  }

  public getName(): string {
    if (!this.name) {
      throw new ProjectException(
        'invalid-input',
        'Technology name is undefined.'
      );
    }
    return this.name;
  }
}
