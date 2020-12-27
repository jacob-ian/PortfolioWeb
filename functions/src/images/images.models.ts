import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/storage';

/**
 * An error produced by the images service.
 */
export interface ImageServiceError {
  code: number; // the HTTP Code
  error: string; // the error name
  description: string; // the human-readable description of the error
}

/**
 * An Image upload task.
 */
export interface ImageUploadTask {
  percentageChanges: Observable<number>;
  snapshotChanges: Observable<any>;
  ref: firebase.storage.Reference;
}
