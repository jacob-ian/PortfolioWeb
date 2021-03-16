import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HomeComponent } from '../home.component';
import { DisplayButtonComponent } from './display-button.component';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('DisplayButtonComponent', () => {
  let component: DisplayButtonComponent;
  let fixture: ComponentFixture<DisplayButtonComponent>;
  let router: Router;
  let element: HTMLElement;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayButtonComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent },
          { path: 'test', component: HomeComponent },
        ]),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    element = fixture.nativeElement;
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test the router link.', () => {
    let route = '/test';
    beforeEach(() => {
      component.setRouterLink(route);
    });

    it('Should navigate to the route.', fakeAsync(() => {
      let routerSpy = spyOn(router, 'navigateByUrl');
      let anchor = fixture.debugElement.query(By.css('a'));
      anchor.nativeElement.click();
      tick();
      expect(routerSpy).toHaveBeenCalled();
    }));
  });
});
