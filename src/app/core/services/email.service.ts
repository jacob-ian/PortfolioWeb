import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private afs: AngularFirestore) {}

  /**
   * Adds an email address to the email list
   * @param email the email address
   * @returns void
   */
  async addEmail(email: string): Promise<void> {
    // Create an email Id
    const emailId = this.afs.createId();

    // Add the email to the database
    return await this.afs
      .doc(`/emails/${emailId}`)
      .set({ uid: emailId, email: email }, { merge: true });
  }

  /**
   * Unsubscribes the user from email notifications
   * @param uid the email address's UID in the database
   * @returns void
   */
  async removeEmail(uid: string): Promise<void> {
    // Try remove the email
    return await this.afs.doc(`/emails/${uid}`).delete();
  }
}
