import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public getYear(): number {
    return new Date().getFullYear();
  }
}
