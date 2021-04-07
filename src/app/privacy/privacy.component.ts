import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.sass'],
})
export class PrivacyComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  public goBack(event: any): void {
    event.preventDefault();
    this.location.back();
  }
}
