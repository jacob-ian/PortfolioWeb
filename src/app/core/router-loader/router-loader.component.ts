import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-router-loader',
  templateUrl: './router-loader.component.html',
  styleUrls: ['./router-loader.component.sass'],
  animations: [
    trigger('dissolve', [
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate(
          '300ms ease-in-out',
          style({ opacity: 0, height: 0, transform: 'translateX(100%)' })
        ),
      ]),
    ]),
  ],
})
export class RouterLoaderComponent implements OnInit {
  // The show boolean
  @Input() show: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  startLoading(): void {
    // Start loading
    this.show = true;
  }

  stopLoading(): void {
    // Stop the loading
    this.show = false;
  }
}
