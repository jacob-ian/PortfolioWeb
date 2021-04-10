import { OpenGraphTag } from './open-graph-tag';
import { OpenGraphTagFactory } from './open-graph-tag-factory';

describe('OpenGraphTagFactory', () => {
  let factory = new OpenGraphTagFactory();

  it('should create an instance', () => {
    expect(factory).toBeTruthy();
  });

  it('Should create an OpenGraphTag', () => {
    let tag = factory.createTag('test', 'test content');
    expect(tag).toBeInstanceOf(OpenGraphTag);
  });
});
