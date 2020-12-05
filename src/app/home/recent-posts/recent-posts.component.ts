import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Snippet } from '../../blog/services/blog.models';
import { SnippetsService } from '../../blog/services/snippets.service';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.sass'],
})
export class RecentPostsComponent implements OnInit {
  // Create the snippets list observable
  snippets$: Observable<Snippet[]>;

  // Create the index variable
  snippetsIndex: number = 0;

  // Create an error input
  @Input() error: string;

  constructor(private snipService: SnippetsService) {}

  ngOnInit(): void {
    // Initiliase the snippets service
    this.snipService.filter({
      limit: 3,
    });

    // Subscribe to the snippets observable
    this.snippets$ = this.snipService.snippets$;
  }

  /**
   * Fetches the next 3 posts
   */
  async next(): Promise<void> {
    // Increment the index by 3
    this.snippetsIndex += 3;

    // Paginate the data to start after the last object in the snippets list
    try {
      // Get the timestamp from the last snippet in the list
      var list = await this.snippets$.toPromise();
      const len = list.length;
      const lastSnippet = list[len - 1];
      const timestamp = lastSnippet.dateCreated;

      // Call the filter function
      return this.snipService.filter({
        startAfter: timestamp,
        endBefore: null, // make sure endbefore is cleared
      });
    } catch (err) {
      // Display the error description
      this.error = err.description;
    }
  }

  /**
   * Fetches the previous 3 posts
   */
  async prev(): Promise<void> {
    // Reduce the index by 3
    this.snippetsIndex -= 3;

    // Paginate the data to go back 3 objects in the list
    try {
      // Get the first item in the list
      var list = await this.snippets$.toPromise();
      const firstSnippet = list[0];

      // Get the timestamp of the first item
      const timestamp = firstSnippet.dateCreated;

      // Call the filter function
      return this.snipService.filter({
        endBefore: timestamp,
        startAfter: null, // make sure startafter is cleared
      });
    } catch (err) {
      // Display the error
      this.error = err.description;
    }
  }
}
