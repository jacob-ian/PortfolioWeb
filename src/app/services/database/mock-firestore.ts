import { Observable, of } from 'rxjs';

interface Collection {
  valueChanges: () => Observable<any[]>;
}

export class MockFirestore {
  private docs: any[];

  constructor(testDocuments: any[]) {
    this.docs = testDocuments;
  }

  public createId(): string {
    return 'generated_id';
  }

  public collection(path: string): Collection {
    return {
      valueChanges: () => {
        return of(this.docs);
      },
    };
  }
}
