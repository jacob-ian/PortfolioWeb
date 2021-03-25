import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EducationService } from '../services/education/education.service';
import { Qualification } from '../services/education/qualification';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass'],
})
export class AboutComponent implements OnInit {
  private qualifications: Observable<Qualification[]> = null;

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {}

  public getQualifications(): Observable<Qualification[]> {
    if (!this.qualifications) {
      this.qualifications = this.educationService.getQualifications();
      this.sortQualificationsByEndDate();
    }
    return this.qualifications;
  }

  private sortQualificationsByEndDate() {
    this.qualifications = this.qualifications.pipe(
      map((array) => this.sortByEndDate(array))
    );
  }

  private sortByEndDate(array: Qualification[]): Qualification[] {
    return array.sort(
      (a, b) => b.getDateEndMilliseconds() - a.getDateEndMilliseconds()
    );
  }
}
