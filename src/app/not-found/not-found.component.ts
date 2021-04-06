import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass'],
})
export class NotFoundComponent implements OnInit {
  private badRequest: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.badRequest = this.getBadRequestFromRoute();
  }

  private getBadRequestFromRoute(): string {
    let routeSnapshot = this.route.snapshot;
    return routeSnapshot.url.join('/');
  }

  public getBadRequest(): string {
    return this.badRequest;
  }
}
