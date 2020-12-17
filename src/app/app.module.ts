import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { RecentPostsComponent } from './home/recent-posts/recent-posts.component';
import { PostEditorComponent } from './dashboard/post-editor/post-editor.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './blog/post/post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PostFeedComponent } from './blog/post-feed/post-feed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { ErrorMessageComponent } from './core/error-message/error-message.component';
import { LoaderComponent } from './core/loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// Firebase libraries
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// Other Angular libraries
import { ReactiveFormsModule } from '@angular/forms';

// Misc
import { MarkdownModule } from 'ngx-markdown';
import { NotificationsComponent } from './core/notifications/notifications.component';
import { RssFeedComponent } from './rss-feed/rss-feed.component';
import { SmartBoxComponent } from './core/smart-box/smart-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    PortfolioComponent,
    ContactComponent,
    RecentPostsComponent,
    PostEditorComponent,
    DashboardComponent,
    LoginComponent,
    PostComponent,
    NotFoundComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    PostFeedComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    UnsubscribeComponent,
    ErrorMessageComponent,
    LoaderComponent,
    SidebarComponent,
    NotificationsComponent,
    RssFeedComponent,
    SmartBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('main-sw.js', {
      enabled: environment.production,
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireFunctionsModule,
    AngularFireAnalyticsModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    AngularFireMessagingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
