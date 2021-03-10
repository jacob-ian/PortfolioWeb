import { AbstractPageTag, PageTagFactory } from './abstract-tag-factory';
import { OpenGraphTag } from './open-graph-tag';

export class OpenGraphTagFactory implements PageTagFactory {
  createTag(property: string, content: string): AbstractPageTag {
    return new OpenGraphTag(property, content);
  }
}
