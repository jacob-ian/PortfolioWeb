import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { MetaTags } from './core.models';

export { MetaTags };

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Subscribe to the router events to update the page's meta tags
   * @returns a subscription
   */
  subscribe(): Subscription {
    // Pipe the router events into a subscription that pulls all the data
    return this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        // Create a meta tags object with the route's data
        var metaTags: MetaTags = {
          title: event['title'],
          description: event['description'],
        };

        // Check for the og image
        if (event['og']['image']) {
          metaTags.image = event['og']['image'];
        }

        // Check for the og type
        if (event['og']['type']) {
          metaTags.type = event['og']['type'];
        }

        // Update the page meta tags
        this.updateMetaTags(metaTags);
      });
  }

  /**
   * Update the page's title
   * @param title the page title
   * @returns void
   */
  updateTitle(title: string): void {
    // Update the title
    this.titleService.setTitle(title);

    // Update the OG tag
    this.metaService.updateTag({ name: 'og:title', content: title });
  }

  /**
   * Updates the page description
   * @param description The page description
   */
  updateDescription(description: string): void {
    // Update the description meta tag
    this.metaService.updateTag({
      name: 'description',
      content: description,
    });

    // Update the description og tag
    this.metaService.updateTag({
      name: 'og:description',
      content: description,
    });

    return;
  }

  /**
   * Update the OpenGraph details for the page
   * @param openGraph the open graph details object
   * @returns void
   */
  updateMetaTags(metaTags: MetaTags): void {
    // Destructure the inputs
    const { title, description, image, type, article } = metaTags;

    // Update the title
    this.updateTitle(title);

    // Update the description
    this.updateDescription(description);

    // Check for an image
    if (image) {
      // Update the image og tag
      this.metaService.updateTag({
        name: 'og:image',
        content: image,
      });
    }

    // Check for a type tag
    if (type) {
      // Update the type OG tag
      this.metaService.updateTag({
        name: 'og:type',
        content: type,
      });
    }

    // Check for an article info tag
    if (article) {
      // Get the keys of the article object
      Object.keys(article).forEach((key) => {
        // Check if the object key is an array (tags)
        if (key.includes('tag')) {
          // We need to add multiple og tags for each tag
          article[key].forEach((string) => {
            this.metaService.addTag({
              name: 'og:article:tag',
              content: string,
            });
          });
        } else {
          // Add the article OG tag to the page meta
          this.metaService.addTag({
            name: `og:article:${key}`,
            content: article[key],
          });
        }
      });
    }
  }
}
