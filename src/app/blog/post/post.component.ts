import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { MetaService, MetaTags } from 'src/app/core/services/meta.service';
import { Post } from '@functions/blog/blog.models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent implements OnInit, OnDestroy {
  // Define the Post observable
  post$: Observable<Post>;

  // Define the error message
  error: string;

  // A subscription to the post for the meta service
  metaSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostsService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    // Get the post name from the child route parameters
    this.post$ = this.route.paramMap.pipe(
      switchMap(async (params) => {
        // Get the name
        const postName = params.get('name');

        // Check if the name exists
        if (!postName) {
          // We need to route back to the blog page
          await this.router.navigate(['/blog']);
          return null;
        }

        // Fetch the post by name
        try {
          return await this.postService.getPostByName(postName);
        } catch (err) {
          // Check if it is a 404 error
          if (err.code === 404) {
            // We can navigate to the 404 page
            this.router.navigate(['/404']);
            return null;
          } else {
            // Set the error message
            this.error = err.description;
            return null;
          }
        }
      })
    );

    // Subscribe to the post to update the meta service
    this.metaSubscription = this.post$.subscribe((post) => {
      // Check for a post
      if (post) {
        // Get the title, description, tags, thumbnail, published time, updated time, author, and category
        const {
          title,
          description,
          thumbnail,
          dateCreated,
          dateUpdated,
          author,
          tags,
          section,
        } = post;

        // Get the tags array from the booleans
        var tagsArr: string[] = [];
        Object.keys(tags).forEach((tag) => {
          // Check if the boolean is true for the tag
          if (tags[tag]) {
            // Add the tag to the tags array
            tagsArr.push(tag);
          }
        });

        // Create the meta tags object
        const metaTags: MetaTags = {
          title,
          description,
          image: thumbnail.href,
          type: 'article',
          article: {
            published_time: new Date(dateCreated).toISOString(),
            author: author.name,
            tag: tagsArr,
            section,
          },
        };

        // Check if the post has a modified time
        if (dateUpdated) {
          // Add the modified time to the OG object
          metaTags.article.modified_time = new Date(dateUpdated).toISOString();
        }

        // Update the meta tags
        this.metaService.updateMetaTags(metaTags);
      }
    });
  }

  ngOnDestroy(): void {
    // Remove the meta subscription
    if (this.metaSubscription) {
      this.metaSubscription.unsubscribe();
    }
  }
}
