import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass'],
})
export class NotFoundComponent implements OnInit {
  private badRequest: Observable<string>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.badRequest = this.getBadRequestFromRoute();
  }

  private getBadRequestFromRoute(): Observable<string> {
    let routeSnapshot = this.route.url.pipe(
      map((segment) => segment.join('/'))
    );
    return routeSnapshot;
  }

  public getBadRequest(): Observable<string> {
    return this.badRequest;
  }
}
