import { Utils } from './utils';

describe('Utils', () => {
  it('should create an instance', () => {
    expect(new Utils()).toBeTruthy();
  });

  describe('Test Formatting Date', () => {
    it('Should return feb 2021', () => {
      let date = new Date('20 Feb 2021');
      let formatted = Utils.formatTimeMsToMMMYYYY(date.getTime());
      expect(formatted).toBe('feb 2021');
    });

    it('Should return dec 2149', () => {
      let date = new Date('01 Dec 2149');
      let formatted = Utils.formatTimeMsToMMMYYYY(date.getTime());
      expect(formatted).toBe('dec 2149');
    });
  });

  describe('Test sorting strings alphabetically', () => {
    it('Should return array in alphabetical order', () => {
      let unsorted = ['d', 'a', 'c', 'b'];
      let sorted = Utils.sortStringsAlphabetically(unsorted);
      expect(sorted).toEqual(['a', 'b', 'c', 'd']);
    });

    it('Should return word array in alphabetical order', () => {
      let unsorted = ['zappy', 'jacob', 'molten'];
      let sorted = Utils.sortStringsAlphabetically(unsorted);
      expect(sorted).toEqual(['jacob', 'molten', 'zappy']);
    });
  });
});
