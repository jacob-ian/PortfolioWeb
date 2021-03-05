import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CheckboxControlValueAccessor,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  // The checkbox element
  @ViewChild('checkbox', { static: true }) checkboxRef: ElementRef;
  checkbox: HTMLInputElement;

  // The disabled status
  @Input('disabled') disabled: boolean;

  // The required status
  @Input('required') required: boolean;

  // The checked status
  @Input('checked') checked: boolean;

  constructor() {}

  ngOnInit(): void {
    // Define the checkbox
    this.checkbox = this.checkboxRef.nativeElement;
  }

  // The on change and on touched methods
  onChange: any = () => {};
  onTouched: any = () => {};

  // The default value accessor methods
  writeValue(value: any): void {
    // Set the new value
    this.checkbox.checked = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    // Register the on change method
    this.onChange = fn;
  }
  registerOnTouched(fn: () => {}): void {
    // Register the ontouched method
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    // Set the disabled state
    this.disabled = isDisabled;
  }
}
