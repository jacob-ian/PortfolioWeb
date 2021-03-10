import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HomeComponent } from '../home/home.component';

import { RouteDataService } from './route-data.service';

describe('RouteDataService', () => {
  let service: RouteDataService;
  let router: Router;

  let testRouteData1: Data = {
    title: 'Page1',
    description: 'Test Page 1',
    og: {
      image: 'test.jpg',
    },
  };

  let testRouteData2: Data = {
    title: 'Page2',
    description: 'Test Page 2',
    og: {
      image: 'test2.jpg',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteDataService],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '1', data: testRouteData1, component: HomeComponent },
          { path: '2', data: testRouteData2, component: HomeComponent },
        ]),
      ],
    });
    service = TestBed.inject(RouteDataService);
    router = TestBed.inject(Router);

    router.initialNavigation();
  });

  describe('Test the Route Data Observable', () => {
    let routeData$: Observable<Data>;

    beforeEach(() => {
      routeData$ = service.getRouteDataObservable();
    });

    it('Should return the first test data', async () => {
      return router.navigateByUrl('/1').then(() => {
        routeData$.subscribe((data) => {
          expect(data).toEqual(testRouteData1);
        });
      });
    });

    it('Should return the second test data', async () => {
      return router.navigateByUrl('/2').then(() => {
        routeData$.subscribe((data) => {
          expect(data).toEqual(testRouteData2);
        });
      });
    });
  });

  describe('Test getting the Route Data object', () => {
    it('Should equal the first test data object', async () => {
      return router.navigateByUrl('/1').then(() => {
        let routeData = service.getRouteData();
        expect(routeData).toEqual(testRouteData1);
      });
    });
  });

  describe('Test setting the Route Data object', () => {
    let routeData$: Observable<Data>;

    beforeEach(async () => {
      routeData$ = service.getRouteDataObservable();
      return router.navigateByUrl('/2').then(() => {
        service.setRouteData(testRouteData1);
      });
    });

    it('Observable should be the first test route data object', async () => {
      routeData$.subscribe((data) => {
        expect(data).toBe(testRouteData1);
      });
    });
  });
});
