import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-flex-container',
  templateUrl: './flex-container.component.html',
  styleUrls: ['./flex-container.component.sass'],
})
export class FlexContainerComponent implements OnInit, OnChanges {
  @Input() public centered: boolean;
  @HostBinding('style.align-items') private alignItems: string;

  constructor() {}

  ngOnInit(): void {
    this.alignItems = this.getItemAlignment();
  }

  private getItemAlignment(): string {
    return this.centered ? 'center' : 'auto';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.centered) {
      this.alignItems = this.getItemAlignment();
    }
  }
}
