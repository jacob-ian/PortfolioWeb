import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostRequest, Tags } from '@functions/blog/blog.models';
import { ImageService } from '../../core/services/image.service';
import { PostsService } from '../../blog/services/posts.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.sass'],
})
export class PostEditorComponent implements OnInit {
  // Create the post form
  postForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    thumbnail: this.fb.group({
      type: ['', Validators.required],
      href: ['', Validators.required],
    }),
    content: ['', Validators.required],
    tags: this.fb.group(
      {
        finance: [false],
        development: [false],
        lifestyle: [false],
        politics: [false],
        business: [false],
        science: [false],
      },
      Validators.required
    ),
  });

  // Create a postId variable
  postId: string;

  // Create the tags options object
  tagOptions = [
    'finance',
    'development',
    'lifestyle',
    'politics',
    'business',
    'science',
  ];

  constructor(
    private postService: PostsService,
    private fb: FormBuilder,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    // Create the postID
    this.postId = this.postService.createId();
  }

  /**
   * Begin uploading a blog post image
   * @param event the event from the file selection
   * @returns void
   */
  async uploadImage(event: any): Promise<void> {
    // Upload the image and console log the percentage change
    const uploadTask = this.imageService.uploadBlogPostImage(
      event,
      this.postId
    );

    // Log the change in percentage
    uploadTask.percentageChanges().subscribe((v) => {
      console.log(v);
    });
  }

  async savePost(formData: PostRequest) {
    console.warn(formData);
  }
}
