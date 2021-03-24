import { MockFirestore } from '../database/mock-firestore';
import { Subject, SubjectDocument } from './subject';

export const TEST_SUBJECT_DOCUMENT: SubjectDocument = {
  id: 'test_id',
  name: 'Test Subject',
  handbookUrl: 'google.com',
};

describe('Education -> Subject', () => {
  let mockFirestore: any = new MockFirestore([]);
  let subject: Subject;

  describe('Test with document instantiation', () => {
    beforeEach(() => {
      subject = new Subject(mockFirestore, TEST_SUBJECT_DOCUMENT);
    });

    describe('Test getId()', () => {
      it('Should return the ID', () => {
        expect(subject.getId()).toBe(TEST_SUBJECT_DOCUMENT.id);
      });
    });

    describe('Test getName()', () => {
      it('Should return the name', () => {
        expect(subject.getName()).toBe(TEST_SUBJECT_DOCUMENT.name);
      });
    });

    describe('Test getUrl()', () => {
      it('Should return the url', () => {
        expect(subject.getUrl()).toBe(TEST_SUBJECT_DOCUMENT.handbookUrl);
      });
    });
  });

  describe('Test without document instantiation', () => {
    beforeEach(() => {
      subject = new Subject(mockFirestore);
    });

    describe('Test getId()', () => {
      it('Should throw an exception.', () => {
        expect(subject.getId).toThrowError();
      });
    });

    describe('Test getName()', () => {
      it('Should throw an exception', () => {
        expect(subject.getName).toThrowError();
      });
    });

    describe('Test getUrl()', () => {
      it('Should throw an exception', () => {
        expect(subject.getUrl).toThrowError();
      });
    });
  });
});
