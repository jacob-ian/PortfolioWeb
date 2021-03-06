import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NavItemComponent } from './nav-item.component';
import { routes } from 'src/app/app-routing.module';
import { NavigationService } from 'src/app/services/navigation.service';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NavigationService],
      declarations: [NavItemComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('Component should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Test isRouteActive()', () => {
    describe('Test An Active Route', () => {
      beforeEach(async () => {
        component.setRoute('');
        return await router.navigateByUrl('/');
      });

      it('Should return true (route active)', () => {
        let isRouteActive = component.isRouteActive();
        expect(isRouteActive).toBe(true);
      });
    });

    describe('Test An Inactive Route', () => {
      beforeEach(async () => {
        component.setRoute('about');
        return await router.navigateByUrl('/');
      });

      it('Should return false (route inactive)', () => {
        let isRouteActive = component.isRouteActive();
        expect(isRouteActive).toBe(false);
      });
    });
  });

  describe('Test isUpdateable()', () => {
    describe('Test where it is updateable.', () => {
      beforeEach(() => {
        component.setUpdateable('true');
      });

      it('Should return true.', () => {
        expect(component.isUpdateable()).toBe(true);
      });
    });

    describe("Test where it isn't updateable.", () => {
      beforeEach(() => {
        component.setUpdateable('false');
      });

      it('Should return false.', () => {
        expect(component.isUpdateable()).toBe(false);
      });
    });
  });
});
