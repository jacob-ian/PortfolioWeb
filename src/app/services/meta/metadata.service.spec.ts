import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MetadataService } from './metadata.service';
import {
  AbstractRouteDataService,
  RouteData,
  RouteDataService,
} from './route-data.service';

describe('MetadataService', () => {
  let service: MetadataService;
  let routeDataService: RouteDataService;
  let meta: Meta;
  let title: Title;

  let TEST_ROUTE_DATA_1: RouteData = {
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

  let TEST_ROUTE_DATA_2: RouteData = {
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

  let TEST_ROUTE_DATA_NULL: RouteData = null;
  let TEST_ROUTE_DATA_ONLY_TITLE: RouteData = {
    title: 'Page2',
    meta: null,
    og: null,
  };
  let TEST_ROUTE_DATA_NULL_TITLE: RouteData = {
    title: null,
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

  let TEST_ROUTE_DATA_EMPTY_META_OG: RouteData = {
    title: 'Page2',
    meta: [],
    og: [],
  };

  class FakeRouteDataService implements AbstractRouteDataService {
    private data: BehaviorSubject<RouteData>;

    constructor() {
      this.data = new BehaviorSubject<RouteData>(TEST_ROUTE_DATA_1);
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
    routeDataService = TestBed.inject(RouteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test Metadata Automatic Update', () => {
    beforeEach(() => {
      routeDataService.setRouteData(TEST_ROUTE_DATA_1);
    });
    describe('Test with non-null route data.', () => {
      beforeEach(() => {
        routeDataService.setRouteData(TEST_ROUTE_DATA_2);
      });

      it('Should have an updated title.', () => {
        let pageTitle = title.getTitle();
        expect(pageTitle).toBe(TEST_ROUTE_DATA_2.title);
      });

      it('Should have an updated description meta tag.', () => {
        let pageDescription = meta.getTag("name='description'");
        expect(pageDescription.content).toBe(TEST_ROUTE_DATA_2.meta[0].content);
      });

      it('Should have an open graph image tag', () => {
        let openGraphTag = meta.getTag("property='og:image'");
        expect(openGraphTag.content).toBe(TEST_ROUTE_DATA_2.og[0].content);
      });
    });

    describe('Test with all null route data.', () => {
      beforeEach(() => {
        routeDataService.setRouteData(TEST_ROUTE_DATA_NULL);
      });

      it('Should use the default title.', () => {
        let pageTitle = title.getTitle();
        expect(pageTitle).toBe(environment.websiteName);
      });

      it('Should not have a description tag.', () => {
        let pageDescription = meta.getTag("name='description'");
        expect(pageDescription).toBeFalsy();
      });

      it('Should not have an open graph tag.', () => {
        let ogTag = meta.getTag("property='og:image'");
        expect(ogTag).toBeFalsy();
      });
    });

    describe('Test with only title in route data.', () => {
      beforeEach(() => {
        routeDataService.setRouteData(TEST_ROUTE_DATA_ONLY_TITLE);
      });

      it('Should have the updated title', () => {
        let pageTitle = title.getTitle();
        expect(pageTitle).toBe(TEST_ROUTE_DATA_ONLY_TITLE.title);
      });

      it('Should not have a description tag.', () => {
        let pageDescription = meta.getTag("name='description'");
        expect(pageDescription).toBeFalsy();
      });

      it('Should not have an open graph tag.', () => {
        let ogTag = meta.getTag("property='og:image'");
        expect(ogTag).toBeFalsy();
      });
    });

    describe('Test with only data and no title.', () => {
      beforeEach(() => {
        routeDataService.setRouteData(TEST_ROUTE_DATA_NULL_TITLE);
      });

      it('Should use the default title.', () => {
        let pageTitle = title.getTitle();
        expect(pageTitle).toBe(environment.websiteName);
      });

      it('Should have a new description tag.', () => {
        let pageDescription = meta.getTag("name='description'");
        expect(pageDescription.content).toBe(
          TEST_ROUTE_DATA_NULL_TITLE.meta[0].content
        );
      });

      it('Should have a new open graph tag.', () => {
        let ogTag = meta.getTag("property='og:image'");
        expect(ogTag.content).toBe(TEST_ROUTE_DATA_NULL_TITLE.og[0].content);
      });
    });

    describe('Test with empty data arrays and non-null title', () => {
      beforeEach(() => {
        routeDataService.setRouteData(TEST_ROUTE_DATA_EMPTY_META_OG);
      });

      it('Should have the updated title', () => {
        let pageTitle = title.getTitle();
        expect(pageTitle).toBe(TEST_ROUTE_DATA_EMPTY_META_OG.title);
      });

      it('Should not have a description tag.', () => {
        let pageDescription = meta.getTag("name='description'");
        expect(pageDescription).toBeFalsy();
      });

      it('Should not have an open graph tag.', () => {
        let ogTag = meta.getTag("property='og:image'");
        expect(ogTag).toBeFalsy();
      });
    });
  });

  describe('Test Setting Page Meta Data', () => {
    beforeEach(() => {
      service.setPageMetaData(TEST_ROUTE_DATA_2);
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

  describe('Test Getting Page Meta Data', () => {
    it('Should equal the first test data.', () => {
      let pageMetaData = service.getPageMetaData();
      expect(pageMetaData).toBe(TEST_ROUTE_DATA_1);
    });
  });
});
