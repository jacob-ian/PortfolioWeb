import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { MetadataService } from '../services/meta/metadata.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let title: Title;
  let meta: Meta;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [Meta, Title],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    title = TestBed.inject(Title);
    meta = TestBed.inject(Meta);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
