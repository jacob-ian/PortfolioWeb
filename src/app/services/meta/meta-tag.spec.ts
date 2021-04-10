import { TestBed } from '@angular/core/testing';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { MetaTag } from './meta-tag';

describe('MetaTag', () => {
  let meta: Meta;

  let metaName = 'test';
  let metaContent = 'Test content';

  let metaTag = new MetaTag(metaName, metaContent);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Meta],
    });

    meta = TestBed.inject(Meta);
  });

  it('should create an instance', () => {
    expect(metaTag).toBeTruthy();
  });

  describe('Test getting the MetaDefinition', () => {
    let metaDefinition: MetaDefinition;

    beforeEach(() => {
      metaDefinition = metaTag.getMetaDefinition();
    });

    it('Should have a name property', () => {
      let name = metaDefinition.name;
      expect(name).toBe(metaName);
    });

    it('Should have a content property', () => {
      let content = metaDefinition.content;
      expect(content).toBe(metaContent);
    });
  });

  describe('Test getting the tag name', () => {
    it('Should return a name', () => {
      let name = metaTag.getName();
      expect(name).toBe(metaName);
    });
  });

  describe('Test getting the tag content', () => {
    it('Should return a content string', () => {
      let content = metaTag.getContent();
      expect(content).toBe(metaContent);
    });
  });

  describe('Test getting the Meta tag selector', () => {
    it('Should return the selector', () => {
      let selector = metaTag.getSelector();
      expect(selector).toBe(`name="${metaName}"`);
    });
  });
});
