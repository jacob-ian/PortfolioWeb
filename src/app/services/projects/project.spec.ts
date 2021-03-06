import { Project } from './project';
import { Projects } from '@shared/projects';

const TEST_DOCUMENT_FINISHED: Projects.Document = {
  id: '1',
  name: 'website',
  description: 'a website',
  technologies: ['angular', 'javascript', 'typescript'],
  links: [
    {
      name: 'GitHub Repo',
      url: 'https://github.com',
    },
    {
      name: 'Website',
      url: 'https://google.com',
    },
  ],
  dateStart: new Date('01 Feb 2021').getTime(),
  status: 'finished',
  dateEnd: new Date('01 Mar 2021').getTime(),
};

const TEST_DOCUMENT_ONGOING: Projects.Document = {
  id: '2',
  name: 'website2',
  description: 'another website',
  technologies: ['angular', 'javascript', 'typescript'],
  links: [
    {
      name: 'GitHub Repo',
      url: 'https://github.com',
    },
    {
      name: 'Website',
      url: 'https://google.com',
    },
  ],
  dateStart: new Date('01 Mar 2021').getTime(),
  status: 'ongoing',
};

const TEST_DOCUMENT_WITH_ICON: Projects.Document = {
  ...TEST_DOCUMENT_ONGOING,
  iconUrl: 'https://fakeicon.com/icon.png',
};

describe('Project', () => {
  let mockDatabase: any = {};
  let project: Project;

  describe('Test getId', () => {
    describe('Test with document instantiation', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });
      it('Should return the ID', () => {
        let id = project.getId();
        expect(id).toBe(TEST_DOCUMENT_FINISHED.id);
      });
    });
  });

  describe('Test getName', () => {
    describe('Test with document instantiation', () => {
      describe('Test with document instantiation', () => {
        beforeEach(() => {
          project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
        });
        it('Should return the name', () => {
          let name = project.getName();
          expect(name).toBe(TEST_DOCUMENT_FINISHED.name);
        });
      });
    });
  });

  describe('Test getDescription', () => {
    describe('Test with document instantiation', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });
      it('Should return the description', () => {
        let desc = project.getDescription();
        expect(desc).toBe(TEST_DOCUMENT_FINISHED.description);
      });
    });
  });

  describe('Test getTechnologies', () => {
    describe('Test with document instantiation', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });
      it('Should return the technologies', () => {
        let tech = project.getTechnologies();
        expect(tech).toBe(TEST_DOCUMENT_FINISHED.technologies);
      });
    });
  });

  describe('Test getLinks', () => {
    describe('Test with document instantiation', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });
      it('Should return the repo URL', () => {
        let links = project.getLinks();
        expect(links).toBe(TEST_DOCUMENT_FINISHED.links);
      });
    });
  });

  describe('Test getDateStart', () => {
    describe('Test with document instantiation', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });
      it('Should return the date string', () => {
        let date = project.getDateStart();
        expect(date).toBe('feb 2021');
      });
    });
  });

  describe('Test getDateStartMs', () => {
    describe('Test with document instantiation', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });
      it('Should return the milliseconds', () => {
        let ms = project.getDateStartMs();
        expect(ms).toBe(TEST_DOCUMENT_FINISHED.dateStart);
      });
    });
  });

  describe('Test getStatus', () => {
    describe('Test with document instantiation', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });
      it('Should return the status', () => {
        let status = project.getStatus();
        expect(status).toBe(TEST_DOCUMENT_FINISHED.status);
      });
    });
  });

  describe('Test getDateEnd', () => {
    describe('Test with provided input', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });
      it('Should return mar 2021', () => {
        let date = project.getDateEnd();
        expect(date).toBe('mar 2021');
      });
    });
    describe('Test without provided input', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_ONGOING);
      });
      it('Should return null', () => {
        let date = project.getDateEnd();
        expect(date).toBeNull();
      });
    });
  });

  describe('Test getDateEndMs', () => {
    describe('Test with provided input', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });

      it('Should return the timestamp in milliseconds', () => {
        let ms = project.getDateEndMs();
        expect(ms).toBe(TEST_DOCUMENT_FINISHED.dateEnd);
      });
    });
    describe('Test without provided inputs', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_ONGOING);
      });

      it('Should return null', () => {
        let ms = project.getDateEndMs();
        expect(ms).toBeNull();
      });
    });
  });

  describe('Test getIconUrl', () => {
    describe('Test with provided input', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_WITH_ICON);
      });

      it('Should return the url to the icon', () => {
        let url = project.getIconUrl();
        expect(url).toBe(TEST_DOCUMENT_WITH_ICON.iconUrl);
      });
    });
    describe('Test without document instantiation', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });

      it('Should return null', () => {
        let url = project.getIconUrl();
        expect(url).toBeNull();
      });
    });
  });

  describe('Test usesTechnologies', () => {
    describe('Test with document instantiation', () => {
      beforeEach(() => {
        project = new Project(mockDatabase, TEST_DOCUMENT_FINISHED);
      });
      it('Should return false from array with no overlap', () => {
        let tech = ['c++', '.net'];
        let usesTech = project.usesTechnologies(tech);
        expect(usesTech).toBeFalse();
      });

      it('Should return false from array with some overlap', () => {
        let tech = ['angular', 'javascript', 'fakey'];
        let usesTech = project.usesTechnologies(tech);
        expect(usesTech).toBeFalse();
      });

      it('Should return true from array with all overlap', () => {
        let tech = ['angular', 'javascript', 'typescript'];
        let usesTech = project.usesTechnologies(tech);
        expect(usesTech).toBeTrue();
      });
    });
  });
});
