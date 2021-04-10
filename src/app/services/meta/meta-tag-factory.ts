import { AbstractPageTag, PageTagFactory } from './abstract-tag-factory';
import { MetaTag } from './meta-tag';

export class MetaTagFactory implements PageTagFactory {
  createTag(name: string, content: string): AbstractPageTag {
    return new MetaTag(name, content);
  }
}
