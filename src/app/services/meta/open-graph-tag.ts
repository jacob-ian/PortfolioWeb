import { MetaDefinition } from '@angular/platform-browser';
import { PageTag } from './abstract-tag-factory';

export class OpenGraphTag extends PageTag {
  constructor(property: string, content: string) {
    super(`og:${property}`, content);
  }

  public getMetaDefinition(): MetaDefinition {
    let definition: MetaDefinition = {
      property: this.name,
      content: this.content,
    };
    return definition;
  }

  public getSelector(): string {
    return `property="${this.name}"`;
  }
}
