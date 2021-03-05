import * as admin from 'firebase-admin';

export class Database {
  private firestoreDirectory: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;

  constructor(directory: string) {
    this.firestoreDirectory = admin.firestore().doc(directory);
  }

  public create(obj: any) {}

  public update() {}

  public delete() {}
}
