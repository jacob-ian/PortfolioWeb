import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';

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
import { FlexContainerComponent } from './window/flex-container/flex-container.component';
import { SocialLinksComponent } from './window/social-links/social-links.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { environment } from 'src/environments/environment';
import { QualificationComponent } from './about/qualification/qualification.component';
import { SubjectComponent } from './about/qualification/subject/subject.component';

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
    FlexContainerComponent,
    SocialLinksComponent,
    QualificationComponent,
    SubjectComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
  ],
  providers: [
    Meta,
    {
      provide: USE_FIRESTORE_EMULATOR,
      useValue: environment.useEmulators ? ['localhost', 8080] : undefined,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
