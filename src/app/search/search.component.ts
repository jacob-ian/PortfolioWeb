import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MetaService } from '../core/services/meta.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private metaService: MetaService
  ) {}

  // The subscription to the query parameters
  querySub: Subscription;

  // The search term
  @Input() searchQuery: string;

  ngOnInit(): void {
    // Subscribe to the query parameters
    this.querySub = this.route.queryParams.subscribe((params) => {
      if (params.query) {
        // Update the search term
        this.searchQuery = params.query;

        // Update the page title
        return this.metaService.updateTitle(
          `${this.searchQuery} - Search | Jacob Ian Matthews`
        );
      } else {
        // Navigate back home
        return this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to the query parameters
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }
}
