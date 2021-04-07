import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';

import { PrivacyComponent } from './privacy.component';

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;
  let spyLocation = jasmine.createSpyObj('Location', ['back']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: Location, useValue: spyLocation }],
      declarations: [PrivacyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call the back method on location on clicking the anchor', fakeAsync(() => {
    let event = { preventDefault: () => {} };
    component.goBack(event);
    tick();
    expect(spyLocation.back).toHaveBeenCalled();
  }));
});
