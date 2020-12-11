import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Snippet, SnippetQuery, Tags } from '@functions/blog/blog.models';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class SnippetsService {
  // The Snippets list
  snippets$: Observable<Snippet[]>;

  // The snippet filters
  private limit$: BehaviorSubject<number | null>;
  private startAfter$: BehaviorSubject<number | null>;
  private endBefore$: BehaviorSubject<number | null>;
  private order$: BehaviorSubject<'asc' | 'desc' | null>;
  private tags$: BehaviorSubject<Partial<Tags> | null>;

  constructor(private afs: AngularFirestore) {
    // Construct the snippet filters
    this.limit$ = new BehaviorSubject(null);
    this.order$ = new BehaviorSubject('desc');
    this.startAfter$ = new BehaviorSubject(null);
    this.endBefore$ = new BehaviorSubject(null);
    this.tags$ = new BehaviorSubject(null);

    // Define the snippets observable
    this.snippets$ = combineLatest([
      this.order$,
      this.limit$,
      this.startAfter$,
      this.endBefore$,
      this.tags$,
    ]).pipe(
      switchMap(([order, limit, startAfter, endBefore, tags]) =>
        this.afs
          .collection<Snippet>('snippets', (ref) => {
            // Create the query for firestore from the observable filters
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;

            // Check the order filter given
            if (order) {
              query = query.orderBy('dateCreated', order);
            }

            // Check the query limit
            if (limit) {
              query = query.limit(limit);
            }

            // Check the start after value
            if (startAfter) {
              query = query.startAfter([{ dateCreated: startAfter }]);
            }

            // Check for an end before value
            if (endBefore) {
              query = query.endBefore([{ dateCreated: endBefore }]);
            }

            // Check if any tags were requested to be searched by
            if (tags) {
              // Loop through the tags object
              Object.keys(tags).forEach((tag) => {
                // Search for the tag in the object
                query = query.where(`tags.${tag}`, '==', tags[tag]);
              });
            }

            return query;
          })
          .valueChanges()
      )
    );
  }

  /**
   * Sets the filter/query for the snippets list
   * @param query the query to filter the snippets list
   * @returns void
   */
  filter({ order, limit, startAfter, endBefore, tags }: SnippetQuery): void {
    // Check for the order filter
    if (order) {
      this.order$.next(order);
    }

    // Check for a post limit
    if (limit) {
      this.limit$.next(limit);
    }

    // Check for a start after limit
    if (startAfter) {
      this.startAfter$.next(startAfter);
    }

    // Check for an endBefore value
    if (endBefore) {
      this.endBefore$.next(endBefore);
    }

    // Check for any tags in the query
    if (tags) {
      this.tags$.next(tags);
    }
  }
}
