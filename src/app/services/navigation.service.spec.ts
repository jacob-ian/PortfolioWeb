import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NavigationService } from './navigation.service';
import { HomeComponent } from '../home/home.component';

describe('NavigationService', () => {
  let service: NavigationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'about', component: HomeComponent },
          {
            path: 'projects/:id',
            component: HomeComponent,
            children: [{ path: 'test', component: HomeComponent }],
          },
        ]),
      ],
    });

    service = TestBed.inject(NavigationService);
    router = TestBed.inject(Router);
    router.initialNavigation();
  });

  it('Service should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test getCurrentRouteObservable()', function () {
    describe('Test getting route from flat path.', () => {
      beforeEach(async () => {
        return await router.navigateByUrl('/about');
      });
      it('Should return a route of "about"', () => {
        service.getCurrentRouteObservable().subscribe((route) => {
          expect(route).toBe('about');
        });
      });
    });

    describe('Test getting base route from "/projects/:id/test"', function () {
      beforeEach(async () => {
        return await router.navigateByUrl('/projects/1/test');
      });

      it('Should return a route of "projects".', () => {
        service.getCurrentRouteObservable().subscribe((route) => {
          expect(route).toBe('projects');
        });
      });
    });
  });
});
