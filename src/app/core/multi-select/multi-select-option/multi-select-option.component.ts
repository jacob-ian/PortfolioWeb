import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Exception } from 'src/app/services/exception';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-multi-select-option',
  templateUrl: './multi-select-option.component.html',
  styleUrls: ['./multi-select-option.component.sass'],
})
export class MultiSelectOptionComponent implements OnInit {
  @Input('option') private option: string;
  @Output() public selectEvent = new EventEmitter<string>();
  private checked: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public getOption(): string {
    if (!this.option) {
      throw new Exception(
        'CORE',
        'invalid-input',
        'The "option" attribute is required.'
      );
    }
    return this.option;
  }

  public isChecked(): boolean {
    return this.checked;
  }

  public onClick(): void {
    this.toggleCheck();
    this.emitValue();
  }

  private toggleCheck(): void {
    this.checked = !this.checked;
  }

  private emitValue(): void {
    let emitMessage = this.createEmitMessage();
    this.selectEvent.emit(emitMessage);
  }

  private createEmitMessage(): string {
    let instruction = this.checked ? '+' : '-';
    return `${instruction}${this.option}`;
  }

  /**
   * TESTING ONLY
   */
  public setOption(option: string): void {
    if (environment.production) {
      throw new Exception(
        'CORE',
        'internal',
        'Cannot set option using testing method.'
      );
    }
    this.option = option;
  }
}
