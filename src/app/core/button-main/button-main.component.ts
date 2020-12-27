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
  selector: 'app-button-main',
  templateUrl: './button-main.component.html',
  styleUrls: ['./button-main.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonMainComponent),
      multi: true,
    },
  ],
})
export class ButtonMainComponent implements OnInit, ControlValueAccessor {
  // The button element
  @ViewChild('button', { static: true }) buttonRef: ElementRef;
  button: HTMLButtonElement;

  // The button type input
  @Input('type') type: 'menu' | 'reset' | 'submit';

  // The disabled input
  @Input('disabled') isDisabled: boolean;

  // The value getter and setter
  get value(): any {
    return this.button.value;
  }
  set value(value: any) {
    this.button.value = value;
  }

  constructor() {}

  // The methods for change and touched
  onChange: any = () => {};

  onTouched: any = () => {};

  writeValue(obj: any): void {
    // Update the button value
    this.button.value = obj;
  }
  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // Update the disabled status
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    // Define the button
    this.button = this.buttonRef.nativeElement;
  }
}
