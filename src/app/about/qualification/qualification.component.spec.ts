import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  Qualification,
  QualificationDocument,
} from 'src/app/services/education/qualification';

import { QualificationComponent } from './qualification.component';

const TEST_DOCUMENT: QualificationDocument = {
  id: '1',
  name: 'Fake Degree',
  description: 'A Minor in Testing',
  dateStart: new Date('January 1, 2021').getTime(),
  dateEnd: new Date('February 1, 2021').getTime(),
  handbookUrl: 'http://google.com',
  institution: {
    name: 'Test Academy',
    location: 'Perth, WA',
    url: 'http://test.example.com',
    imageUrl: 'http://google.com/logo.png',
    type: 'CollegeOrUniversity',
  },
  credentialCategory: 'degree',
  educationLevel: 'intermediate',
};

describe('QualificationComponent', () => {
  let component: QualificationComponent;
  let fixture: ComponentFixture<QualificationComponent>;
  let qualification: Qualification;
  let mockFirestore: any = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualificationComponent],
    }).compileComponents();
  });

  describe('Test Qualification with all fields occupied.', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(QualificationComponent);
      component = fixture.componentInstance;
      qualification = new Qualification(mockFirestore, TEST_DOCUMENT);
      component.setQualification(qualification);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('Test date rendering', () => {
      it('Should render the end date', () => {
        let date = fixture.debugElement.query(By.css('.date.top'));
        let ele = date.nativeElement;
        let endDate = ele.innerText;
        expect(endDate).toBe('FEB 2021');
      });

      it('Should render the start date', () => {
        let date = fixture.debugElement.query(By.css('.date.bottom'));
        let ele = date.nativeElement;
        let startDate = ele.innerText;
        expect(startDate).toBe('JAN 2021');
      });
    });

    describe('Test institution name rendering', () => {
      it('Should render an anchor tag', () => {
        let anchor = fixture.debugElement.query(By.css('.institution-name'))
          .nativeElement;
        let name = anchor.nodeName;
        expect(name).toBe('A');
      });

      it('Should have href of institution', () => {
        let anchor = fixture.debugElement.query(By.css('.institution-name'));
        let href = anchor.attributes.href;
        expect(href).toBe(TEST_DOCUMENT.institution.url);
      });

      it('Should have name and location of institution', () => {
        let anchor = fixture.debugElement.query(By.css('.institution-name'))
          .nativeElement;
        let name = anchor.innerText;
        expect(name).toBe(
          `${TEST_DOCUMENT.institution.name}, ${TEST_DOCUMENT.institution.location}`
        );
      });
    });

    describe('Test image rendering', () => {
      it('Should render the institution image with the correct src', () => {
        let divChildren = fixture.debugElement.query(
          By.css('.qualification-image')
        ).children;
        let anchor = divChildren.find(
          (child) => child.nativeElement.nodeName === 'A'
        );
        let image = anchor.children.find(
          (child) => child.nativeElement.nodeName === 'IMG'
        );
        let src = image.attributes.src;
        expect(src).toBe(TEST_DOCUMENT.institution.imageUrl);
      });
    });

    describe('Test qualification name rendering', () => {
      let anchor: DebugElement;

      beforeEach(() => {
        let divChildren = fixture.debugElement.query(
          By.css('.qualification-name')
        ).children;
        anchor = divChildren.find(
          (child) => child.nativeElement.nodeName === 'A'
        );
      });

      it('Should have correct href in anchor', () => {
        let href = anchor.attributes.href;
        expect(href).toBe(TEST_DOCUMENT.handbookUrl);
      });

      it('Should have the name inside the anchor', () => {
        let name = anchor.nativeElement.innerText;
        expect(name).toBe(TEST_DOCUMENT.name);
      });
    });

    describe('Test rendering of description', () => {
      it('Should render the correct description', () => {
        let div = fixture.debugElement.query(
          By.css('.qualification-description')
        ).nativeElement;
        let description = div.innerText;
        expect(description).toBe(TEST_DOCUMENT.description);
      });
    });

    describe('Test rendering of the Schema structured data', () => {
      let metaTags: DebugElement[];

      beforeEach(() => {
        let divChildren = fixture.debugElement.query(By.css('.qualification'))
          .children;
        metaTags = divChildren.filter(
          (element) => element.nativeElement.nodeName === 'META'
        );
      });

      it('Should render the credential category meta element', () => {
        let tag = metaTags.find(
          (meta) => meta.attributes.itemprop === 'credentialCategory'
        );
        let content = tag.attributes.content;
        expect(content).toBe(TEST_DOCUMENT.credentialCategory);
      });

      it('Should render the educationalLevel meta element', () => {
        let tag = metaTags.find(
          (meta) => meta.attributes.itemprop === 'educationalLevel'
        );
        let content = tag.attributes.content;
        expect(content).toBe(TEST_DOCUMENT.educationLevel);
      });
    });
  });
});
