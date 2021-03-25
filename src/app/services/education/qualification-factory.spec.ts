import { Observable } from 'rxjs';
import { MockFirestore } from '../database/mock-firestore';
import { Qualification, QualificationDocument } from './qualification';
import { QualificationFactory } from './qualification-factory';

const TEST_QUALIFICATION_DOCS: QualificationDocument[] = [
  {
    id: '1',
    name: 'Fake Degree',
    description: 'A Minor in Testing',
    dateStart: new Date('January 1, 2021').getTime(),
    dateEnd: new Date('February 1, 2021').getTime(),
    handbookUrl: 'http://google.com',
    institution: {
      name: 'Test Academy',
      location: 'Perth, WA',
      url: 'http://test.example.com',
      imageUrl: 'http://google.com/logo.png',
      type: 'CollegeOrUniversity',
    },
    credentialCategory: 'degree',
    educationLevel: 'intermediate',
  },
  {
    id: '2',
    name: 'Fake Degree2',
    description: 'A Minor in Testing2',
    dateStart: new Date('January 1, 2021').getTime(),
    dateEnd: new Date('February 1, 2021').getTime(),
    handbookUrl: 'http://google2.com',
    institution: {
      name: 'Test Academy2',
      location: 'Perth2, WA',
      url: 'http://test2.example.com',
      imageUrl: 'http://google.com2/logo.png',
      type: 'CollegeOrUniversity',
    },
    credentialCategory: 'degree',
    educationLevel: 'intermediate',
  },
];

const TEST_QUALIFICATION_DOCS_EMPTY = [];

describe('Education -> QualificationFactory', () => {
  let mockFirestore: any;
  let qualFactory: QualificationFactory;

  describe('Test with existing documents', () => {
    beforeEach(() => {
      mockFirestore = new MockFirestore(TEST_QUALIFICATION_DOCS);
      qualFactory = new QualificationFactory(mockFirestore);
    });

    describe('Test creating the Qualifications', () => {
      it('Should return an observable', () => {
        let observable = qualFactory.createFromCollection();
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should have a non-empty array', () => {
        qualFactory.createFromCollection().subscribe((arr) => {
          expect(arr.length).toBeTruthy();
        });
      });

      it('Should return Qualifications in the observable array', () => {
        qualFactory.createFromCollection().subscribe((arr) => {
          expect(arr[0]).toBeInstanceOf(Qualification);
        });
      });

      it('Should contain a test Qualification object', () => {
        qualFactory.createFromCollection().subscribe((arr) => {
          const testQual = new Qualification(
            mockFirestore,
            TEST_QUALIFICATION_DOCS[1]
          );
          expect(arr).toContain(testQual);
        });
      });
    });
  });

  describe('Test with non-existent documents', () => {
    beforeEach(() => {
      mockFirestore = new MockFirestore(TEST_QUALIFICATION_DOCS_EMPTY);
      qualFactory = new QualificationFactory(mockFirestore);
    });

    describe('Test creating the Qualifications', () => {
      it('Should return an observable', () => {
        let observable = qualFactory.createFromCollection();
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return an empty array in the observable', () => {
        qualFactory.createFromCollection().subscribe((quals) => {
          expect(quals.length).toBeFalsy();
        });
      });
    });
  });
});
