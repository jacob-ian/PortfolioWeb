import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.sass'],
})
export class ErrorMessageComponent implements OnInit {
  // The error message input
  @Input('error') error: string;

  // The standalone class input
  @Input('standalone') standalone: boolean;

  constructor() {}

  ngOnInit(): void {}
}
