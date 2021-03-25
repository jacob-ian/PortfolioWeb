import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Institution,
  Qualification,
} from 'src/app/services/education/qualification';
import { Subject } from 'src/app/services/education/subject';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.sass'],
})
export class QualificationComponent implements OnInit {
  @Input('qualification') private qualification: Qualification;

  constructor() {}

  ngOnInit(): void {}

  public getName(): string {
    try {
      return this.qualification.getName();
    } catch (err) {
      console.error(err);
    }
  }

  public getDescription(): string {
    try {
      return this.qualification.getDescription();
    } catch (error) {
      console.error(error);
    }
  }

  public getUrl(): string {
    try {
      return this.qualification.getUrl();
    } catch (error) {
      console.error(error);
    }
  }

  public getInstitution(): Institution {
    try {
      return this.qualification.getInstitution();
    } catch (error) {
      console.error(error);
    }
  }

  public getImage(): string {
    try {
      let institution = this.getInstitution();
      return institution.imageUrl;
    } catch (error) {
      console.error(error);
    }
  }

  public getInstitutionName(): string {
    try {
      let institution = this.getInstitution();
      return institution.name;
    } catch (error) {
      console.error(error);
    }
  }

  public getInstitutionUrl(): string {
    try {
      let instution = this.getInstitution();
      return instution.url;
    } catch (error) {
      console.error(error);
    }
  }

  public getInstitutionLocation(): string {
    try {
      let institution = this.getInstitution();
      return institution.location;
    } catch (error) {
      console.error(error);
    }
  }

  public getInstitutionType(): string {
    try {
      let institution = this.getInstitution();
      let type = institution.type;
      if (!type) {
        return 'EducationalOrganization';
      }
      return type;
    } catch (err) {
      console.error(err);
    }
  }

  public getDateStart(): string {
    try {
      return this.qualification.getDateStart();
    } catch (error) {
      console.error(error);
    }
  }

  public getDateEnd(): string {
    try {
      return this.qualification.getDateEnd();
    } catch (error) {
      console.error(error);
    }
  }

  public getSubjects(): Observable<Subject[]> {
    try {
      return this.qualification.getSubjects();
    } catch (err) {
      console.error(err);
    }
  }

  public async hasSubjects(): Promise<boolean> {
    try {
      return (await this.getSubjects().toPromise()).length > 0;
    } catch (error) {
      console.error(error);
    }
  }

  public getCredentialCategory(): string {
    try {
      return this.qualification.getCredentialCateogry();
    } catch (error) {
      console.error(error);
    }
  }

  public getEducationLevel(): string {
    try {
      return this.qualification.getEducationLevel();
    } catch (error) {
      console.error(error);
    }
  }
}
