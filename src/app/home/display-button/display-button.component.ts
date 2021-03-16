import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-button',
  templateUrl: './display-button.component.html',
  styleUrls: ['./display-button.component.sass'],
})
export class DisplayButtonComponent implements OnInit {
  @Input('routerLink') private routerLink: string;

  constructor() {}

  ngOnInit(): void {}

  public getRouterLink(): string {
    return this.routerLink;
  }

  public setRouterLink(link: string): void {
    this.routerLink = link;
  }
}
