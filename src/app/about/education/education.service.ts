import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EducationException } from './education-exception';
import {
  AbstractInstitution,
  Institution,
  InstitutionDocument,
} from './institution';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private institutions: AbstractInstitution[] = [];

  constructor(private firestore: AngularFirestore) {}

  public async getInstitutions(): Promise<AbstractInstitution[]> {
    let documents = await this.getFirestoreDocuments();
    this.createInstitutionsFromDocs(documents);
    return this.institutions;
  }

  private async getFirestoreDocuments() {
    try {
      return await this.firestore
        .collection<InstitutionDocument>('institutions')
        .get()
        .toPromise();
    } catch (err) {
      throw new EducationException(err);
    }
  }

  private createInstitutionsFromDocs(
    documents: firebase.default.firestore.QuerySnapshot<InstitutionDocument>
  ): void {
    documents.forEach((doc) =>
      this.institutions.push(this.createInstitution(doc.data()))
    );
  }

  private createInstitution(
    document: InstitutionDocument
  ): AbstractInstitution {
    return new Institution(document);
  }
}
