import { MetaTag } from './meta-tag';
import { MetaTagFactory } from './meta-tag-factory';

describe('MetaTagFactory', () => {
  let metaTagFactory = new MetaTagFactory();
  it('should create an instance', () => {
    expect(metaTagFactory).toBeTruthy();
  });

  it('Should create a Meta Tag object', () => {
    let tag = metaTagFactory.createTag('test', 'this is a test tag');
    expect(tag).toBeInstanceOf(MetaTag);
  });
});
