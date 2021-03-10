import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { MetadataService } from './metadata.service';
import {
  AbstractRouteDataService,
  RouteData,
  RouteDataService,
} from './route-data.service';

describe('MetadataService', () => {
  let service: MetadataService;
  let meta: Meta;
  let title: Title;

  let testRouteData1: RouteData = {
    title: 'Page1',
    meta: [
      {
        name: 'description',
        content: 'Test Page 1',
      },
    ],
    og: [
      {
        name: 'image',
        content: 'test1.jpg',
      },
    ],
  };

  let testRouteData2: RouteData = {
    title: 'Page2',
    meta: [
      {
        name: 'description',
        content: 'Test Page 2',
      },
    ],
    og: [
      {
        name: 'image',
        content: 'test2.jpg',
      },
    ],
  };

  class FakeRouteDataService implements AbstractRouteDataService {
    private data: BehaviorSubject<RouteData>;

    constructor() {
      this.data = new BehaviorSubject<RouteData>(testRouteData1);
    }
    public getRouteData(): RouteData {
      return this.data.value;
    }

    public getRouteDataObservable(): Observable<RouteData> {
      return this.data.asObservable();
    }

    public setRouteData(data: RouteData) {
      this.data.next(data);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MetadataService,
        { provide: RouteDataService, useValue: new FakeRouteDataService() },
        Meta,
        Title,
      ],
    });
    service = TestBed.inject(MetadataService);
    meta = TestBed.inject(Meta);
    title = TestBed.inject(Title);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test Metadata Automatic Update', () => {
    it('Should have an updated title.', () => {
      let pageTitle = title.getTitle();
      expect(pageTitle).toBe('Page1');
    });

    it('Should have an updated description meta tag.', () => {
      let pageDescription = meta.getTag("name='description'");
      expect(pageDescription.content).toBe('Test Page 1');
    });

    it('Should have an open graph image tag', () => {
      let openGraphTag = meta.getTag("property='og:image'");
      expect(openGraphTag.content).toBe('test1.jpg');
    });
  });

  describe('Test Setting Page Meta Data', () => {
    beforeEach(() => {
      service.setPageMetaData(testRouteData2);
    });

    it('Should have an updated title.', () => {
      let pageTitle = title.getTitle();
      expect(pageTitle).toBe('Page2');
    });

    it('Should have an updated description meta tag.', () => {
      let pageDescription = meta.getTag("name='description'");
      expect(pageDescription.content).toBe('Test Page 2');
    });

    it('Should have an open graph image tag', () => {
      let openGraphTag = meta.getTag("property='og:image'");
      expect(openGraphTag.content).toBe('test2.jpg');
    });
  });
});
