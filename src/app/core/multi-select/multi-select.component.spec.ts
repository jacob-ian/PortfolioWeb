import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { MultiSelectOptionComponent } from './multi-select-option/multi-select-option.component';

import { MultiSelectComponent } from './multi-select.component';

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent;
  let fixture: ComponentFixture<MultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSelectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectComponent);
    component = fixture.componentInstance;
    component.setOptions(['chocolate', 'strawberry', 'banana', 'caramel']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Test opening and closing the options dropdown', () => {
    let options: HTMLElement;
    let displayStyle: string;
    beforeEach(() => {
      component.toggleOptions();
      fixture.detectChanges();
      options = fixture.debugElement.query(By.css('.options')).nativeElement;
      displayStyle = options.style.display;
    });

    it('Should have the display style as block', () => {
      expect(displayStyle).toBe('block');
    });

    it('Should have the display style as none', () => {
      component.toggleOptions();
      fixture.detectChanges();
      displayStyle = options.style.display;
      expect(displayStyle).toBe('none');
    });

    it('Should set display to none after clicking the document', () => {
      let document: HTMLElement = fixture.debugElement.query(By.css('*'))
        .nativeElement;
      document.click();
      fixture.detectChanges();
      displayStyle = options.style.display;
      expect(displayStyle).toBe('none');
    });
  });

  describe('Test creating the multi-select options', () => {
    describe('Test alphabetically ordered', () => {
      let options: DebugElement;
      let children: DebugElement[];
      beforeEach(() => {
        component.setSorting('alpha');
        component.toggleOptions();
        fixture.detectChanges();
        options = fixture.debugElement.query(By.css('.options'));
        children = options.nativeElement.children;
      });

      it('Should create multi-select options', () => {
        expect(children.length).toBe(4);
      });
    });
  });

  describe('Test emitting values', () => {
    let options: DebugElement[];
    beforeEach(() => {
      component.setSorting('alpha');
      component.toggleOptions();
      let optionContainer = fixture.debugElement.query(By.css('.options'));
      options = optionContainer.children;
    });

    it('Should emit all options in array after all being clicked', () => {
      component.value.pipe(take(3)).subscribe((value: string[]) => {
        expect(value).toBe(['banana', 'caramel', 'chocolate', 'strawberry']);
      });
      options.forEach((option) => option.nativeElement.click());
    });
  });
});
