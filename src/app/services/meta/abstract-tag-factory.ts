import { Meta, MetaDefinition } from '@angular/platform-browser';

export interface PageTagFactory {
  createTag(name: string, content: string): AbstractPageTag;
}

export interface AbstractPageTag {
  getName(): string;
  getContent(): string;
  getMetaDefinition(): MetaDefinition;
  getSelector(): string;
}

export class PageTag implements AbstractPageTag {
  protected name: string;
  protected content: string;

  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
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

  public getSelector(): string {
    return null;
  }
}
