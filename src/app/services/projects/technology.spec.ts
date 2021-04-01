import { MockFirestore } from '../database/mock-firestore';
import { Technology, TechnologyDocument } from './technology';

const TEST_TECH_1: TechnologyDocument = {
  id: '1',
  name: 'angular',
};

describe('Technology', () => {
  let mockFirestore: any = new MockFirestore([]);
  let technology: Technology;

  describe('Test getId()', () => {
    it('Should return an ID with document instantiation', () => {
      technology = new Technology(mockFirestore, TEST_TECH_1);
      let id = technology.getId();
      expect(id).toBe(TEST_TECH_1.id);
    });
  });

  describe('Test getName()', () => {
    it('Should return the name with doc instantiation', () => {
      technology = new Technology(mockFirestore, TEST_TECH_1);
      let name = technology.getName();
      expect(name).toBe(TEST_TECH_1.name);
    });
  });
});
