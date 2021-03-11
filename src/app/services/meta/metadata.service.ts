import { Injectable, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractPageTag, PageTagFactory } from './abstract-tag-factory';
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
  private defaultTitle: string = environment.websiteName;
  private subscriptionToRouteData: Subscription;
  private pageTagFactory: PageTagFactory;
  private currentPageTags: AbstractPageTag[] = [];
  private currentRouteData: RouteData = null;

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
    this.currentRouteData = data;
    this.deleteCurrentMetaTags();

    this.updatePageTitle();
    this.updateMetaTags();
    this.updateOpenGraphTags();
  }

  private deleteCurrentMetaTags(): void {
    this.currentPageTags.forEach((pageTag) => this.deleteTag(pageTag));
  }

  private deleteTag(pageTag: AbstractPageTag): void {
    let tagSelector = pageTag.getSelector();
    this.meta.removeTag(tagSelector);
  }

  private updatePageTitle(): void {
    let title = this.currentRouteData?.title;
    if (!title) {
      title = this.defaultTitle;
    }
    this.setPageTitle(title);
  }

  private setPageTitle(title: string): void {
    return this.title.setTitle(title);
  }

  private updateMetaTags(): void {
    let metaData = this.currentRouteData?.meta;
    if (metaData) {
      this.setPageTags(PageTagType.Meta, metaData);
    }
  }

  private updateOpenGraphTags(): void {
    let openGraphData = this.currentRouteData?.og;
    if (openGraphData) {
      this.setPageTags(PageTagType.OpenGraph, openGraphData);
    }
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
    return this.saveTagToList(pageTag);
  }

  private tagExists(selector: string): boolean {
    return !!this.meta.getTag(selector);
  }

  private saveTagToList(pageTag: AbstractPageTag): void {
    this.currentPageTags.push(pageTag);
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
