import { Meta, MetaDefinition } from '@angular/platform-browser';

export interface PageTagFactory {
  createTag(name: string, content: string): AbstractPageTag;
}

export interface AbstractPageTag {
  addToPage(): void;
  getName(): string;
  getContent(): string;
  getMetaDefinition(): MetaDefinition;
}

export class PageTag implements AbstractPageTag {
  protected name: string;
  protected content: string;
  protected meta: Meta;

  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
    this.meta = new Meta(document);
  }

  public addToPage(): void {
    return;
  }

  public getName(): string {
    return this.name;
  }
  public getContent(): string {
    return this.content;
  }

  public getMetaDefinition(): MetaDefinition {
    return null;
  }

  protected updateExistingTag(tagDefinition: MetaDefinition): void {
    this.meta.updateTag(tagDefinition);
  }

  protected addNewTag(tagDefinition: MetaDefinition): void {
    this.meta.addTag(tagDefinition);
  }
}
