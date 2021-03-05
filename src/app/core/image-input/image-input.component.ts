import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageInputComponent),
      multi: true,
    },
  ],
})
export class ImageInputComponent implements OnInit, ControlValueAccessor {
  // The input source of a pre-loaded image
  @Input('src') src: string | SafeUrl;

  // The alternative text for the image
  @Input('alt') alt: string;

  // The shape of the image required
  @Input('shape') shape: 'round' | 'square' | 'original';

  // The name of the button file input button
  @Input('buttonName') buttonName: string;

  // Set the disabled state
  @Input('disabled') disabled: boolean;

  // The image upload percentage
  @Input() uploadPercentage: Observable<number>;

  // The input element
  @ViewChild('input', { static: true }) inputRef: ElementRef;
  input: HTMLInputElement;

  // The onChange and onTouch Methods
  onChange = (url: string | SafeUrl) => {};
  onTouched = () => {};

  // The file name
  filename: string;

  constructor(
    private sanitizer: DomSanitizer,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    // Define the input element
    this.input = this.inputRef.nativeElement;
  }

  /**
   * Sanitize an image url so that the preview can be displayed.
   * @param imageUrl the image's URL
   * @returns a SafeURL to be displayed
   */
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  /**
   * Begin uploading the image.
   * @param event the event from the file input
   * @returns void
   */
  cropImage(event: any): void {
    // Get the file from the input
    const files = event.target.files;

    // Check that there was a file selected
    if (files && files[0]) {
      // Save the filename
      this.filename = files[0]['name'];

      // Open the image cropping dialog
    }
  }

  /**
   * Upload the profile image to Firebase.
   * @param base64 the base64 image string
   * @returns void
   */
  async uploadImage(base64: string): Promise<void> {
    // Start the image uploading and get the upload task
    this.imageService.uploadProfileImage(base64, this.filename);
  }

  // The value getter
  get value() {
    // Return the image source
    return this.src;
  }

  // The value writer
  writeValue(obj: string): void {
    // Sanitize and update the source
    this.src = this.sanitizer.bypassSecurityTrustUrl(obj);

    // Call the changed method
    this.onChange(this.value);
  }

  registerOnChange(fn: any): void {
    // Register the on change method
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // Register the onTouched method
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // Set the disabled boolean
    this.disabled = isDisabled;
  }
}
