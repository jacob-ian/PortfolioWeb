/**
 * An error produced by the images service.
 */
export interface ImageServiceError {
  code: number; // the HTTP Code
  error: string; // the error name
  description: string; // the human-readable description of the error
}
