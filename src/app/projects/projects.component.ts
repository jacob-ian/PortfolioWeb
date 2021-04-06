import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Project } from '../services/projects/project';
import { ProjectService } from '../services/projects/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private filter: BehaviorSubject<string[]>;
  private projects: BehaviorSubject<Project[]>;
  private filteredProjects: BehaviorSubject<Project[]>;

  private projectSubscription: Subscription;
  private filterSubscription: Subscription;

  constructor(private projectService: ProjectService) {}

  public ngOnInit(): void {
    this.filter = new BehaviorSubject([]);
    this.projects = new BehaviorSubject([]);
    this.filteredProjects = new BehaviorSubject([]);
    this.startFilteringProjects();
  }

  /**
   * This method was used as a work around due to RXJS combineLatest
   * not working with Angular Universal and causing infinite page loading
   * with no component render. The error leads to a JavaScript heap error on the
   * Universal Express server.
   */
  private startFilteringProjects(): void {
    this.projectSubscription = this.subscribeToProjects();
    this.filterSubscription = this.subscribeToFilter();
  }

  private subscribeToProjects(): Subscription {
    return this.getProjectsObservable().subscribe((projects) => {
      this.projects.next(projects);
      this.onObservableChange();
    });
  }

  private getProjectsObservable(): Observable<Project[]> {
    return this.projectService.getProjects();
  }

  private onObservableChange(): void {
    let filteredProjects = this.filterProjectsWithTechnologies();
    return this.filteredProjects.next(filteredProjects);
  }

  private filterProjectsWithTechnologies(): Project[] {
    let projects = this.projects.value;
    let technologies = this.filter.value;
    if (this.canFilterProjects()) {
      projects = this.filterProjects(projects, technologies);
    }
    let sortedFilteredProjects = this.sortProjectsByDateEnd(projects);
    return sortedFilteredProjects;
  }

  private canFilterProjects(): boolean {
    return this.hasProjects() && this.hasTechnologies();
  }

  private hasProjects(): boolean {
    return this.projects.value.length > 0;
  }

  private hasTechnologies(): boolean {
    return this.filter.value.length > 0;
  }

  private filterProjects(
    projects: Project[],
    technologies: string[]
  ): Project[] {
    return projects.filter((project) => project.usesTechnologies(technologies));
  }

  private sortProjectsByDateEnd(projects: Project[]): Project[] {
    return projects.sort((a, b) => a.getDateEndMs() - b.getDateEndMs());
  }

  private subscribeToFilter(): Subscription {
    return this.getFilterObservable().subscribe(() =>
      this.onObservableChange()
    );
  }

  private getFilterObservable(): Observable<string[]> {
    return this.filter.asObservable();
  }

  public getFilteredProjects(): Observable<Project[]> {
    return this.filteredProjects.asObservable();
  }

  public onFilter(filter: string[]): void {
    this.filter.next(filter);
  }

  public ngOnDestroy(): void {
    this.unsubscribeFromObservables();
  }

  private unsubscribeFromObservables(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }
}
