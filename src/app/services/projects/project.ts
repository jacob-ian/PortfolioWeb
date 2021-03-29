import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseObject } from '../database/database-object';
import { Exception } from '../exception';

export interface ProjectDocument {
  id: string;
  name: string;
  description: string;
  dateStart: number;
  dateEnd: number;
  technologies;

  iconUrl?: string;
}

export class Project extends DatabaseObject {
  private id: string;
  private name: string;

  constructor(firestore: AngularFirestore, document: ProjectDocument) {
    super(firestore);
    if (this.isDocument(document)) {
    }
  }

  private isDocument(document: ProjectDocument): document is ProjectDocument {
    if (!document) {
      throw new Exception(
        'PROJ',
        'invalid-input',
        'The project document is invalid.'
      );
    }

    return !!(document.id && document.name && document.description);
  }
}
