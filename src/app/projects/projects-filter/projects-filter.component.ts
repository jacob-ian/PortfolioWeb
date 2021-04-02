import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/app/services/logger.service';
import { ProjectService } from 'src/app/services/projects/project.service';

@Component({
  selector: 'app-projects-filter',
  templateUrl: './projects-filter.component.html',
  styleUrls: ['./projects-filter.component.sass'],
})
export class ProjectsFilterComponent implements OnInit {
  private technologies: Observable<string[]>;
  @Output() public filterTo = new EventEmitter<string[]>();

  constructor(
    private projectService: ProjectService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {}

  public getTechnologies(): Observable<string[]> {
    if (!this.technologies) {
      this.fetchTechnologiesFromService();
    }
    return this.technologies;
  }

  private fetchTechnologiesFromService(): void {
    try {
      this.technologies = this.projectService.getTechnologies();
    } catch (error) {
      this.logger.error(error);
    }
  }

  public onSelectChange(value: string[]): void {
    this.filterTo.emit(value);
  }
}
