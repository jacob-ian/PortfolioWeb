/**
 * An database model for any mail sent through the function.
 */
export interface SentMail {
  uid?: string;
  to: string[];
  from: string;
  subject: string;
  timestamp: number;
}
