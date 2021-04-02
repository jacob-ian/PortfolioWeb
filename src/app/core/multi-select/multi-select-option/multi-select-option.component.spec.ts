import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

import { MultiSelectOptionComponent } from './multi-select-option.component';

describe('MultiSelectOptionComponent', () => {
  let component: MultiSelectOptionComponent;
  let fixture: ComponentFixture<MultiSelectOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSelectOptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectOptionComponent);
    component = fixture.componentInstance;
    component.setOption('chocolate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test the box checking', () => {
    it('Should render an unchecked box', () => {
      let svg: SVGElement = fixture.debugElement.query(By.css('svg'))
        .nativeElement;
      let containsChecked = svg.classList.contains('checked');
      expect(containsChecked).toBeFalsy();
    });

    it('Should render a checked box', () => {
      component.onClick();
      fixture.detectChanges();
      let svg: SVGElement = fixture.debugElement.query(By.css('svg'))
        .nativeElement;
      let containsChecked = svg.classList.contains('checked');
      expect(containsChecked).toBeTruthy();
    });
  });

  describe('Test emitting the value', () => {
    it('Should emit a +value event', () => {
      component.selectEvent.subscribe((event: string) => {
        expect(event).toBe('+chocolate');
      });
      component.onClick();
    });

    it('Should emit a -value event', () => {
      component.onClick();
      component.selectEvent.pipe(take(1)).subscribe((event: string) => {
        expect(event).toBe('-chocolate');
      });
      component.onClick();
    });
  });

  describe('Test getting the option value', () => {
    it('Should return chocolate', () => {
      let option = component.getOption();
      expect(option).toBe('chocolate');
    });
  });
});
