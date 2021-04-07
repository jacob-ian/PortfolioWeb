import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { NotFoundComponent } from './not-found.component';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let mockRoute: any = {
    url: of(['bad']),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: mockRoute }],
      declarations: [NotFoundComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get the url in the bad request observable', () => {
    component
      .getBadRequest()
      .pipe(take(1))
      .subscribe((badRequest) => {
        expect(badRequest).toBe('bad');
      });
  });

  it('Should render the message with the URL', () => {
    let span = fixture.debugElement.query(By.css('.url')).nativeElement;
    let message = span.innerText;
    expect(message).toBe('/bad');
  });
});
