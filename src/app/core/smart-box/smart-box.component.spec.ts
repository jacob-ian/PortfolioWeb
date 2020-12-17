import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartBoxComponent } from './smart-box.component';

describe('SmartBoxComponent', () => {
  let component: SmartBoxComponent;
  let fixture: ComponentFixture<SmartBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
