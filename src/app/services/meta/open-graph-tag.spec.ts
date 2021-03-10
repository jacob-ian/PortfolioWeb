import { TestBed } from '@angular/core/testing';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { OpenGraphTag } from './open-graph-tag';

describe('OpenGraphTag', () => {
  let meta: Meta;

  let ogProperty = 'image';
  let ogContent = 'test.jpg';

  let openGraphTag = new OpenGraphTag(ogProperty, ogContent);

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Meta] });
    meta = TestBed.inject(Meta);
  });

  it('should create an instance', () => {
    expect(openGraphTag).toBeTruthy();
  });

  describe('Test adding the tag to the document', () => {
    beforeAll(() => {
      openGraphTag.addToPage();
    });

    it('Should have a open graph meta tag on the page', () => {
      let tagExists = meta.getTag(`property='og:${ogProperty}'`);
      expect(tagExists).toBeTruthy();
    });
  });

  describe('Test getting the MetaDefinition', () => {
    let metaDef: MetaDefinition;

    beforeEach(() => {
      metaDef = openGraphTag.getMetaDefinition();
    });

    it('Should have a "property" property', () => {
      let property = metaDef.property;
      expect(property).toBe(`og:${ogProperty}`);
    });

    it('Should have a content property', () => {
      let content = metaDef.content;
      expect(content).toBe(ogContent);
    });
  });

  describe('Test getting the OG tag name', () => {
    it('Should return the property', () => {
      let property = openGraphTag.getName();
      expect(property).toBe(`og:${ogProperty}`);
    });
  });

  describe('Test getting the OG content', () => {
    it('Should return the content', () => {
      let content = openGraphTag.getContent();
      expect(content).toBe(ogContent);
    });
  });
});
