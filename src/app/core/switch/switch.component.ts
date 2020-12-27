import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent implements OnInit, ControlValueAccessor {
  // The range element
  @ViewChild('range', { static: true }) rangeRef: ElementRef;
  range: HTMLInputElement;

  // The disabled status
  @Input('disabled') disabled: boolean;

  // The on and off labels
  @Input('off') offLabel: string;
  @Input('on') onLabel: string;

  constructor() {}

  // The on change and on touched methods
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: boolean): void {
    // Write the value
    this.range.value = value ? '1' : '0';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // Set the disabled state
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    // Define the range element
    this.range = this.rangeRef.nativeElement;
  }
}
