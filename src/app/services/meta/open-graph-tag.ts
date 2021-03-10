import { MetaDefinition } from '@angular/platform-browser';
import { PageTag } from './abstract-tag-factory';

export class OpenGraphTag extends PageTag {
  constructor(property: string, content: string) {
    super(`og:${property}`, content);
  }

  public addToPage(): void {
    let tagDefinition = this.getMetaDefinition();
    if (this.tagExists()) {
      this.updateExistingTag(tagDefinition);
    } else {
      this.addNewTag(tagDefinition);
    }
  }

  public getMetaDefinition(): MetaDefinition {
    let definition: MetaDefinition = {
      property: this.name,
      content: this.content,
    };
    return definition;
  }

  private tagExists(): boolean {
    return !!this.meta.getTag(`property='${this.name}`);
  }
}
