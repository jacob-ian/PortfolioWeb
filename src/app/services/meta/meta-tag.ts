import { MetaDefinition } from '@angular/platform-browser';
import { PageTag } from './abstract-tag-factory';

export class MetaTag extends PageTag {
  constructor(name: string, content: string) {
    super(name, content);
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
      name: this.name,
      content: this.content,
    };
    return definition;
  }

  private tagExists(): boolean {
    return !!this.meta.getTag(`name='${this.name}'`);
  }
}
