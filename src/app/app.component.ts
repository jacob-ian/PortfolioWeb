import { Component } from '@angular/core';
import { MetadataService } from './services/meta/metadata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Jacob Ian Matthews';

  constructor(private metaDataService: MetadataService) {}
}
