import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-expand',
  templateUrl: './button-expand.component.html',
  styleUrls: ['./button-expand.component.sass'],
})
export class ButtonExpandComponent implements OnInit {
  @Input('label') private label: string;
  @Output() expand = new EventEmitter<boolean>();
  public isExpanded: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public getLabel(): string {
    let showHide = this.isExpanded ? 'Hide' : 'Show';
    if (!this.label) {
      return `${showHide} More`;
    }
    return `${showHide} ${this.label}`;
  }

  public setLabel(label: string): void {
    this.label = label;
  }

  public onClick(): void {
    this.isExpanded = !this.isExpanded;
    this.expand.emit(this.isExpanded);
  }
}
