import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterLoaderComponent } from './router-loader.component';

describe('RouterLoaderComponent', () => {
  let component: RouterLoaderComponent;
  let fixture: ComponentFixture<RouterLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
