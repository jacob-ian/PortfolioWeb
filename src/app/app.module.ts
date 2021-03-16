import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WindowComponent } from './window/window.component';
import { NavigationBarComponent } from './window/navigation-bar/navigation-bar.component';
import { NavItemComponent } from './window/navigation-bar/nav-item/nav-item.component';
import { ContentBoxComponent } from './window/content-box/content-box.component';
import { FooterComponent } from './window/footer/footer.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { DisplayButtonComponent } from './home/display-button/display-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    AboutComponent,
    NotFoundComponent,
    WindowComponent,
    NavigationBarComponent,
    NavItemComponent,
    ContentBoxComponent,
    FooterComponent,
    PrivacyComponent,
    TermsComponent,
    DisplayButtonComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
  ],
  providers: [Meta],
  bootstrap: [AppComponent],
})
export class AppModule {}
