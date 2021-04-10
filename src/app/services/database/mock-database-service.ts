import { Observable, of } from 'rxjs';

export class MockDatabaseService {
  private docs: any[];

  constructor(testDocs: any[]) {
    this.docs = testDocs;
  }

  public getCollection<T>(path: string): Observable<T[]> {
    return of(this.docs);
  }
  public createId(): string {
    return 'generated_id';
  }
}
