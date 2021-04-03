import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/services/projects/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass'],
})
export class ProjectComponent implements OnInit {
  @Input('project') private project: Project;

  constructor() {}

  ngOnInit(): void {}
}
