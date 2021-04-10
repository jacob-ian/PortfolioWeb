import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EducationService } from '../services/education/education.service';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let mockService: any = {
    getQualifications: () => {
      return of([]);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: EducationService, useValue: mockService }],
      declarations: [AboutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
