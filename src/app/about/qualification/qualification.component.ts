import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Qualification } from 'src/app/services/education/qualification';
import { Qualifications } from '@shared/education';
import { Subject } from 'src/app/services/education/subject';
import { Exception } from 'src/app/services/exception';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.sass'],
})
export class QualificationComponent implements OnInit {
  @Input('qualification') private qualification: Qualification;

  constructor(private logger: LoggerService) {}

  ngOnInit(): void {}

  public getName(): string {
    try {
      return this.qualification.getName();
    } catch (err) {
      this.logger.error(err);
    }
  }

  public getDescription(): string {
    try {
      return this.qualification.getDescription();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getUrl(): string {
    try {
      return this.qualification.getUrl();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getInstitution(): Qualifications.Institution {
    try {
      return this.qualification.getInstitution();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getImage(): string {
    try {
      let institution = this.getInstitution();
      return institution.imageUrl;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getInstitutionName(): string {
    try {
      let institution = this.getInstitution();
      return institution.name;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getInstitutionUrl(): string {
    try {
      let instution = this.getInstitution();
      return instution.url;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getInstitutionLocation(): string {
    try {
      let institution = this.getInstitution();
      return institution.location;
    } catch (error) {
      this.logger.error(error);
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
      this.logger.error(err);
    }
  }

  public getDateStart(): string {
    try {
      return this.qualification.getDateStart();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getDateEnd(): string {
    try {
      return this.qualification.getDateEnd();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getSubjects(): Observable<Subject[]> {
    try {
      return this.qualification.getSubjects();
    } catch (err) {
      this.logger.error(err);
    }
  }

  public async hasSubjects(): Promise<boolean> {
    try {
      return (await this.getSubjects().toPromise()).length > 0;
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getCredentialCategory(): string {
    try {
      return this.qualification.getCredentialCateogry();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public getEducationLevel(): string {
    try {
      return this.qualification.getEducationLevel();
    } catch (error) {
      this.logger.error(error);
    }
  }

  /**
   * TESTING ONLY
   */
  public setQualification(qualification: Qualification): void {
    if (this.isProductionEnv()) {
      throw new Exception(
        'QUALCOMP',
        'internal-error',
        'This method should not be used in production.'
      );
    }
    this.qualification = qualification;
  }

  private isProductionEnv(): boolean {
    return environment.production;
  }
}
