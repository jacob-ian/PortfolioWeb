import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  makeStateKey,
  StateKey,
  TransferState,
} from '@angular/platform-browser';
import { query } from 'express';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private transferState: TransferState,
    private firestore: AngularFirestore
  ) {}

  public getCollection<T>(path: string): Observable<T[]> {
    let key = this.createStateKey<T>(path);
    if (this.collectionInState(key)) {
      return this.getCollectionFromState(key);
    }
    return this.firestore
      .collection<T>(path)
      .valueChanges()
      .pipe(tap((docs) => this.saveToState(key, docs)));
  }

  private createStateKey<T>(path: string): StateKey<T[]> {
    return makeStateKey<T[]>(path);
  }

  private collectionInState<T>(stateKey: StateKey<T[]>): boolean {
    return this.transferState.hasKey(stateKey);
  }

  private getCollectionFromState<T>(stateKey: StateKey<T[]>): Observable<T[]> {
    return of(this.transferState.get(stateKey, null));
  }

  private saveToState<T>(stateKey: StateKey<T[]>, docs: T[]): void {
    this.transferState.set(stateKey, docs);
  }

  public createId(): string {
    return this.firestore.createId();
  }
}
