import { Observable } from 'rxjs';
import { MockDatabaseService } from '../database/mock-database-service';
import { EducationException } from './education-exception';
import { Qualifications, Subjects } from '@shared/education';
import { Qualification } from './qualification';
import { Subject } from './subject';

const TEST_DOCUMENT: Qualifications.Document = {
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
};

const TEST_DOCUMENT_FUTURE_END: Qualifications.Document = {
  ...TEST_DOCUMENT,
  dateEnd: Date.now() + 8.64e7,
};

const TEST_DOCUMENT_INVALID_DATES: Qualifications.Document = {
  ...TEST_DOCUMENT,
  dateStart: new Date('February 1, 2021').getTime(),
  dateEnd: new Date('January 1, 2021').getTime(),
};

export const TEST_SUBJECT_DOCS_1: Subjects.Document[] = [
  {
    id: '1',
    name: 'Test 1',
    handbookUrl: 'test.com',
  },
  {
    id: '2',
    name: 'Test 2',
    handbookUrl: 'test2.com',
  },
];

describe('Education -> Qualification', () => {
  let qualification: Qualification;
  let mockDatabase: any = new MockDatabaseService(TEST_SUBJECT_DOCS_1);

  describe('Test methods with document instantiation.', () => {
    describe('Test single branch getting methods.', () => {
      beforeEach(() => {
        qualification = new Qualification(mockDatabase, TEST_DOCUMENT);
      });
      describe('Test getName()', () => {
        it('Should return the document name.', () => {
          try {
            let name = qualification.getName();
            expect(name).toBe(TEST_DOCUMENT.name);
          } catch (err) {
            throw err.getMessage();
          }
        });
      });

      describe('Test getDescription()', () => {
        it('Should return the description.', () => {
          try {
            let description = qualification.getDescription();
            expect(description).toBe(TEST_DOCUMENT.description);
          } catch (err) {
            throw err.getMessage();
          }
        });
      });

      describe('Test getId()', () => {
        it('Should return the id', () => {
          try {
            let id = qualification.getId();
            expect(id).toBe(TEST_DOCUMENT.id);
          } catch (err) {
            throw err.getMessage();
          }
        });
      });

      describe('Test getDateStart()', () => {
        it('Should return jan 2021', () => {
          try {
            let date = qualification.getDateStart();
            expect(date).toBe('jan 2021');
          } catch (err) {
            throw err.getMessage();
          }
        });
      });
      describe('Test getUrl()', () => {
        it('Should return the url.', () => {
          try {
            let url = qualification.getUrl();
            expect(url).toBe(TEST_DOCUMENT.handbookUrl);
          } catch (err) {
            throw err.getMessage();
          }
        });
      });
      describe('Test getInstitution()', () => {
        it('Should return the institution.', () => {
          try {
            let institution = qualification.getInstitution();
            expect(institution).toBe(TEST_DOCUMENT.institution);
          } catch (err) {
            throw err.getMessage();
          }
        });
      });

      describe('Test getCredentialCategory()', () => {
        it('Should return the category', () => {
          try {
            let category = qualification.getCredentialCateogry();
            expect(category).toBe(TEST_DOCUMENT.credentialCategory);
          } catch (error) {
            throw error.getMessage();
          }
        });
      });

      describe('Test getEducationLevel()', () => {
        it('Should return the education level', () => {
          try {
            let level = qualification.getEducationLevel();
            expect(level).toBe(TEST_DOCUMENT.educationLevel);
          } catch (error) {
            throw error.getMessage();
          }
        });
      });
    });

    describe('Test multi-branch methods', () => {
      describe('Test getSubjects()', () => {
        describe('Test with existing subjects', () => {
          let observable: Observable<Subject[]>;
          beforeEach(() => {
            mockDatabase = new MockDatabaseService(TEST_SUBJECT_DOCS_1);
            qualification = new Qualification(mockDatabase, TEST_DOCUMENT);
            observable = qualification.getSubjects();
          });
          it('Should return an observable', () => {
            expect(observable).toBeInstanceOf(Observable);
          });

          it('Should return a non-empty array in the observable.', () => {
            observable.subscribe((subjects) => {
              expect(subjects.length).toBeTruthy();
            });
          });

          it('Should return instances of Subject in the array', () => {
            observable.subscribe((subjects) => {
              expect(subjects[0]).toBeInstanceOf(Subject);
            });
          });

          it('Should return the test Subject object', () => {
            const testObj = new Subject(mockDatabase, TEST_SUBJECT_DOCS_1[0]);
            observable.subscribe((subjects) => {
              expect(subjects).toContain(testObj);
            });
          });
        });

        describe('Test without existing subjects', () => {
          let observable: Observable<Subject[]>;
          beforeEach(() => {
            mockDatabase = new MockDatabaseService([]);
            qualification = new Qualification(mockDatabase, TEST_DOCUMENT);
            observable = qualification.getSubjects();
          });

          it('Should return an observable', () => {
            expect(observable).toBeInstanceOf(Observable);
          });

          it('Should return an empty array', () => {
            observable.subscribe((subjects) => {
              expect(subjects.length).toBeFalsy();
            });
          });
        });
      });

      describe('Test with anachronous dates.', () => {
        it('Should throw an exception', () => {
          try {
            new Qualification(mockDatabase, TEST_DOCUMENT_INVALID_DATES);
          } catch (err) {
            expect(err).toBeInstanceOf(EducationException);
          }
        });
      });

      describe('Test getDateEnd()', () => {
        describe('Test with date in the past', () => {
          beforeEach(() => {
            qualification = new Qualification(mockDatabase, TEST_DOCUMENT);
          });

          it('Should return feb 2021', () => {
            try {
              let date = qualification.getDateEnd();
              expect(date).toBe('feb 2021');
            } catch (err) {
              throw err.getMessage();
            }
          });
        });

        describe('Test with date in future.', () => {
          beforeEach(() => {
            qualification = new Qualification(
              mockDatabase,
              TEST_DOCUMENT_FUTURE_END
            );
          });

          it('Should return now', () => {
            try {
              let date = qualification.getDateEnd();
              expect(date).toBe('now');
            } catch (err) {
              throw err.getMessage();
            }
          });
        });
      });
    });
  });

  describe('Test with ID instantiation', () => {
    beforeEach(() => {
      qualification = new Qualification(mockDatabase, 'test_id');
    });

    describe('Test getId()', () => {
      it('Should return the test id', () => {
        let id = qualification.getId();
        expect(id).toBe('test_id');
      });
    });

    describe('Test getName()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getName();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });
    describe('Test getDescription()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getDescription();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });
    describe('Test getDateStart()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getDateStart();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getDateEnd()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getDateEnd();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getDateEndMilliseconds()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getDateEndMilliseconds();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getUrl()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getUrl();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getInstitution()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getInstitution();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getSubjects()', () => {
      describe('Test with existing Subject documents', () => {
        let observable: Observable<Subject[]>;
        beforeEach(() => {
          mockDatabase = new MockDatabaseService(TEST_SUBJECT_DOCS_1);
          qualification = new Qualification(mockDatabase, TEST_DOCUMENT);
          observable = qualification.getSubjects();
        });
        it('Should return an observable', () => {
          expect(observable).toBeInstanceOf(Observable);
        });

        it('Should return a non-empty array in the observable.', () => {
          observable.subscribe((subjects) => {
            expect(subjects.length).toBeTruthy();
          });
        });

        it('Should return instances of Subject in the array', () => {
          observable.subscribe((subjects) => {
            expect(subjects[0]).toBeInstanceOf(Subject);
          });
        });

        it('Should return the test Subject object', () => {
          const testObj = new Subject(mockDatabase, TEST_SUBJECT_DOCS_1[0]);
          observable.subscribe((subjects) => {
            expect(subjects).toContain(testObj);
          });
        });
      });

      describe('Test without existing subjects', () => {
        let observable: Observable<Subject[]>;
        beforeEach(() => {
          mockDatabase = new MockDatabaseService([]);
          qualification = new Qualification(mockDatabase, TEST_DOCUMENT);
          observable = qualification.getSubjects();
        });

        it('Should return an observable', () => {
          expect(observable).toBeInstanceOf(Observable);
        });

        it('Should return an empty array', () => {
          observable.subscribe((subjects) => {
            expect(subjects.length).toBeFalsy();
          });
        });
      });
    });

    describe('Test getCredentialCategory()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getCredentialCateogry();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getEducationLevel()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getEducationLevel();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });
  });

  describe('Test without document instantiation.', () => {
    beforeEach(() => {
      qualification = new Qualification(mockDatabase);
    });
    describe('Test getId()', () => {
      it('Should return a generated id', () => {
        let id = qualification.getId();
        expect(id).toBe('generated_id');
      });
    });

    describe('Test getName()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getName();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });
    describe('Test getDescription()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getDescription();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });
    describe('Test getDateStart()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getDateStart();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getDateEnd()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getDateEnd();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getDateEndMilliseconds()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getDateEndMilliseconds();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getUrl()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getUrl();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getInstitution()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getInstitution();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getSubjects()', () => {
      it('Should throw an exception', () => {
        expect(qualification.getSubjects).toThrowError();
      });
    });
    describe('Test getCredentialCategory()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getCredentialCateogry();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });

    describe('Test getEducationLevel()', () => {
      it('Should throw an exception', () => {
        try {
          qualification.getEducationLevel();
        } catch (err) {
          expect(err).toBeInstanceOf(EducationException);
        }
      });
    });
  });
});
