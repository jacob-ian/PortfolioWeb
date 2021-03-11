import { Component } from '@angular/core';
import { MetadataService } from './services/meta/metadata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'PortfolioWeb';

  constructor(private metaDataService: MetadataService) {}
}
