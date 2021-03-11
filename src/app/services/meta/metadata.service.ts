import { Injectable, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import {
  AbstractPageTag,
  PageTag,
  PageTagFactory,
} from './abstract-tag-factory';
import { MetaTagFactory } from './meta-tag-factory';
import { OpenGraphTagFactory } from './open-graph-tag-factory';
import {
  RouteData,
  RouteDataService,
  RouteDataTag,
} from './route-data.service';

@Injectable({
  providedIn: 'root',
})
export class MetadataService implements OnDestroy {
  private subscriptionToRouteData: Subscription;
  private pageTagFactory: PageTagFactory;

  constructor(
    private routeData: RouteDataService,
    private title: Title,
    private meta: Meta
  ) {
    this.subscriptionToRouteData = this.subscribeToRouteData();
  }

  private subscribeToRouteData(): Subscription {
    let routeData$ = this.routeData.getRouteDataObservable();
    return routeData$.subscribe((data) => this.updatePageMetaData(data));
  }

  private updatePageMetaData(data: RouteData): void {
    if (data) {
      let { title, meta, og } = data;
      this.setPageTitle(title);
      if (meta) {
        this.setPageTags(PageTagType.Meta, meta);
      }
      if (og) {
        this.setPageTags(PageTagType.OpenGraph, og);
      }
    }
  }

  private setPageTitle(title: string): void {
    return this.title.setTitle(title);
  }

  private setPageTags(type: PageTagType, tags: RouteDataTag[]): void {
    this.selectPageTagFactory(type);
    tags.forEach((tag) => {
      let { name, content } = tag;
      let pageTag = this.pageTagFactory.createTag(name, content);
      this.addTagToPage(pageTag);
    });
  }

  private selectPageTagFactory(type: PageTagType): void {
    if (this.isMetaTagType(type)) {
      this.pageTagFactory = new MetaTagFactory();
    } else if (this.isOpenGraphTagType(type)) {
      this.pageTagFactory = new OpenGraphTagFactory();
    }
  }

  private isMetaTagType(type: PageTagType): boolean {
    return type === PageTagType.Meta;
  }

  private isOpenGraphTagType(type: PageTagType): boolean {
    return type === PageTagType.OpenGraph;
  }

  private addTagToPage(pageTag: AbstractPageTag): void {
    let tagSelector = pageTag.getSelector();
    let tagMetaDefinition = pageTag.getMetaDefinition();
    if (this.tagExists(tagSelector)) {
      this.meta.updateTag(tagMetaDefinition);
    } else {
      this.meta.addTag(tagMetaDefinition);
    }
  }

  private tagExists(selector: string): boolean {
    return !!this.meta.getTag(selector);
  }

  public setPageMetaData(data: RouteData): void {
    return this.routeData.setRouteData(data);
  }

  public getPageMetaData(): RouteData {
    return this.routeData.getRouteData();
  }

  ngOnDestroy(): void {
    this.unsubscribeFromObservables();
  }

  private unsubscribeFromObservables(): void {
    if (this.subscriptionToRouteData) {
      this.subscriptionToRouteData.unsubscribe();
    }
  }
}

enum PageTagType {
  Meta = 'meta',
  OpenGraph = 'open',
}
