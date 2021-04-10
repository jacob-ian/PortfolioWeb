import { MetaDefinition } from '@angular/platform-browser';
import { PageTag } from './abstract-tag-factory';

export class MetaTag extends PageTag {
  constructor(name: string, content: string) {
    super(name, content);
  }

  public getMetaDefinition(): MetaDefinition {
    let definition: MetaDefinition = {
      name: this.name,
      content: this.content,
    };
    return definition;
  }

  public getSelector(): string {
    return `name="${this.name}"`;
  }
}
