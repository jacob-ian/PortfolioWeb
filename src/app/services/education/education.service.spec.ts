import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MockFirestore } from '../database/mock-firestore';
import { EducationService } from './education.service';
import { Qualification, QualificationDocument } from './qualification';

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
    },
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
    },
  },
];

describe('EducationService', () => {
  let service: EducationService;

  describe('Test getting the Qualifications', () => {
    describe('Test with existing qualification documents', () => {
      let observable: Observable<Qualification[]>;
      let mockFirestore: any;

      beforeEach(() => {
        mockFirestore = new MockFirestore(TEST_QUALIFICATION_DOCS);
        TestBed.configureTestingModule({
          providers: [{ provide: AngularFirestore, useValue: mockFirestore }],
        });
        service = TestBed.inject(EducationService);
        observable = service.getQualifications();
      });

      it('Should return an observable', () => {
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return a non empty array in the observable.', () => {
        observable.subscribe((quals) => {
          expect(quals.length).toBeTruthy();
        });
      });

      it('Should return an array with Qualification objects', () => {
        observable.subscribe((quals) => {
          expect(quals[0]).toBeInstanceOf(Qualification);
        });
      });

      it('Should return the test Qualification object inside the array', () => {
        observable.subscribe((quals) => {
          const testObj = new Qualification(
            mockFirestore,
            TEST_QUALIFICATION_DOCS[0]
          );
          expect(quals[0]).toEqual(testObj);
        });
      });
    });
    describe('Test without any qualification documents', () => {
      let observable: Observable<Qualification[]>;

      beforeEach(() => {
        const mockFirestore = new MockFirestore([]);
        TestBed.configureTestingModule({
          providers: [{ provide: AngularFirestore, useValue: mockFirestore }],
        });
        service = TestBed.inject(EducationService);
        observable = service.getQualifications();
      });

      it('Should return an observable', () => {
        expect(observable).toBeInstanceOf(Observable);
      });

      it('Should return an empty array in the observable.', () => {
        observable.subscribe((quals) => {
          expect(quals.length).toBeFalsy();
        });
      });
    });
  });
});
