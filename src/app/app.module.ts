import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WindowComponent } from './utils/window/window.component';
import { NavigationBarComponent } from './utils/navigation-bar/navigation-bar.component';
import { NavItemComponent } from './utils/navigation-bar/nav-item/nav-item.component';
import { ContentBoxComponent } from './utils/window/content-box/content-box.component';

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
    ContentBoxComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
