import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Exception } from 'src/app/services/exception';
import { Utils } from 'src/app/services/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.sass'],
})
export class MultiSelectComponent implements OnInit, OnChanges {
  public isOptionsExtended = false;
  @Output() public value = new EventEmitter<string[]>();
  @Input('options') private options: string[];
  @Input('sort') private sort: 'alpha';
  @Input('hint') private hint: string;
  private values: string[] = [];

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event']) private closeOnBodyClick(
    event: any
  ): void {
    if (!this.isOptionsExtended) {
      return;
    }
    let target: HTMLElement = event.target;
    this.closeIfClickOut(target);
  }

  private closeIfClickOut(target: HTMLElement): void {
    if (this.targetIsntMultiSelect(target)) {
      this.toggleOptions();
    }
  }

  private targetIsntMultiSelect(target: HTMLElement): boolean {
    return !this.elementRef.nativeElement.contains(target);
  }

  @HostListener('document:keydown.escape') private closeOnEscKey(): void {
    if (this.isOptionsExtended) {
      this.toggleOptions();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.sortOptions();
    }
  }

  ngOnInit(): void {
    if (!this.options) {
      throw new Exception(
        'CORE',
        'invalid-input',
        'The "options" attribute must be defined.'
      );
    }
    this.sortOptions();
    this.emitValues();
  }

  private sortOptions(): void {
    if (!this.sort) {
      return;
    }

    if (this.sort === 'alpha') {
      this.sortOptionsAlphabetically();
    }
  }

  private sortOptionsAlphabetically(): void {
    this.options = Utils.sortStringsAlphabetically(this.options);
  }

  private emitValues(): void {
    this.value.emit(this.values);
  }

  public getOptions(): string[] {
    if (!this.options) {
      throw new Exception(
        'CORE',
        'invalid-input',
        'The "options" attribute must be defined.'
      );
    }
    return this.options;
  }

  public onOptionSelect(value: string): void {
    let instruction = value[0];
    let option = value.slice(1);

    if (instruction === '+') {
      this.addValue(option);
    } else {
      this.removeValue(option);
    }
    this.emitValues();
  }

  private addValue(value: string): void {
    if (this.valueExists(value)) {
      return;
    }
    this.values.push(value);
  }

  private removeValue(value: string): void {
    if (this.valueExists(value)) {
      this.filterArray(value);
    }
  }

  private valueExists(value: string): boolean {
    return this.values.includes(value);
  }

  private filterArray(value: string): void {
    this.values = this.values.filter((val) => val !== value);
  }

  public toggleOptions(): void {
    this.isOptionsExtended = !this.isOptionsExtended;
  }

  public getPreviewMessage(): string {
    if (this.noValuesSelected()) {
      return this.getPlaceholderMessage();
    }
    return this.getSelectedPreview();
  }

  private noValuesSelected(): boolean {
    return this.values.length === 0;
  }

  private getPlaceholderMessage(): string {
    if (!this.hint) {
      return 'Select multiple...';
    }
    return this.hint;
  }

  private getSelectedPreview(): string {
    this.sortValuesAlphabetically();
    let firstTwoValues = this.values.slice(0, 2);
    let preview = firstTwoValues.join(', ');
    if (this.previewNeedsEllipsis()) {
      preview += ',...';
    }
    return preview;
  }

  private sortValuesAlphabetically(): void {
    this.values = Utils.sortStringsAlphabetically(this.values);
  }

  private previewNeedsEllipsis(): boolean {
    return this.values.length > 2;
  }

  /**
   * TESTING ONLY
   */
  public setOptions(options: string[]): void {
    if (environment.production) {
      throw new Exception(
        'CORE',
        'internal',
        'Cannot use testing only methods in production.'
      );
    }
    this.options = options;
  }

  /**
   * TESTING ONLY
   */
  public setHint(hint: string): void {
    if (environment.production) {
      throw new Exception(
        'CORE',
        'internal',
        'Cannot use testing only methods in production.'
      );
    }
    this.hint = hint;
  }

  /**
   * TESTING ONLY
   */
  public setSorting(sorting: 'alpha'): void {
    if (environment.production) {
      throw new Exception(
        'CORE',
        'internal',
        'Cannot use testing only methods in production.'
      );
    }
    this.sort = sorting;
  }
}
