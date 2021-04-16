import { MockDatabaseService } from '../database/mock-database-service';
import { Technologies } from '@shared/projects';
import { Technology } from './technology';

const TEST_TECH_1: Technologies.Document = {
  id: '1',
  name: 'angular',
  projects: [],
};

describe('Technology', () => {
  let mockDatabase: any = new MockDatabaseService([]);
  let technology: Technology;

  describe('Test getId()', () => {
    it('Should return an ID with document instantiation', () => {
      technology = new Technology(mockDatabase, TEST_TECH_1);
      let id = technology.getId();
      expect(id).toBe(TEST_TECH_1.id);
    });
  });

  describe('Test getName()', () => {
    it('Should return the name with doc instantiation', () => {
      technology = new Technology(mockDatabase, TEST_TECH_1);
      let name = technology.getName();
      expect(name).toBe(TEST_TECH_1.name);
    });
  });
});
