import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonExpandComponent } from './button-expand.component';

describe('ButtonExpandComponent', () => {
  let component: ButtonExpandComponent;
  let fixture: ComponentFixture<ButtonExpandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonExpandComponent],
    }).compileComponents();
  });

  describe('Test without provided label', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ButtonExpandComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should render Show More', () => {
      let label = fixture.debugElement.query(By.css('.label')).nativeElement
        .innerText;
      expect(label).toBe('Show More');
    });

    it('Should render Hide More after click', () => {
      component.onClick();
      fixture.detectChanges();
      let label = fixture.debugElement.query(By.css('.label')).nativeElement
        .innerText;
      expect(label).toBe('Hide More');
    });
  });

  describe('Test with a provided label', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ButtonExpandComponent);
      component = fixture.componentInstance;
      component.setLabel('Eggs');
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should render Show Eggs', () => {
      let label = fixture.debugElement.query(By.css('.label')).nativeElement
        .innerText;
      expect(label).toBe('Show Eggs');
    });

    it('Should render Hide Eggs', () => {
      component.onClick();
      fixture.detectChanges();
      let label = fixture.debugElement.query(By.css('.label')).nativeElement
        .innerText;
      expect(label).toBe('Hide Eggs');
    });
  });

  describe('Test spinning chevron svg', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ButtonExpandComponent);
      component = fixture.componentInstance;
      component.setLabel('Eggs');
      fixture.detectChanges();
    });

    it('Should not have a class of rotated', () => {
      let svg: HTMLElement = fixture.debugElement
        .query(By.css('.icon'))
        .query(By.css('svg')).nativeElement;

      let classList = svg.classList;
      expect(classList.contains('rotated')).toBeFalse();
    });

    it('Should not have a class of rotated', () => {
      component.onClick();
      fixture.detectChanges();
      let svg: HTMLElement = fixture.debugElement
        .query(By.css('.icon'))
        .query(By.css('svg')).nativeElement;

      let classList = svg.classList;
      expect(classList.contains('rotated')).toBeTrue();
    });
  });
});
