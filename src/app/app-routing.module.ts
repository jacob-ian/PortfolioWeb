import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { RouteData } from './services/meta/route-data.service';

const defaultRouteData: RouteData = {
  title: 'Jacob Ian Matthews',
  meta: [
    {
      name: 'description',
      content: 'The portfolio of the software engineer, Jacob Ian Matthews.',
    },
  ],
  og: [
    {
      name: 'image',
      content: '/assets/icons/icon-512x512.png',
    },
  ],
};

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home | Jacob Ian Matthews',
      meta: [
        {
          name: 'description',
          content: 'The home page of Jacob Ian Matthews.com.',
        },
      ],
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About | Jacob Ian Matthews',
      meta: [
        { name: 'description', content: 'Learn more about Jacob Ian Matthews' },
      ],
    },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { title: 'Projects | Jacob Ian Matthews' },
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: { title: 'Privacy Policy | Jacob Ian Matthews' },
  },
  {
    path: 'terms',
    component: TermsComponent,
    data: { title: 'Terms and Conditions | Jacob Ian Matthews' },
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: { title: 'Page Not Found | Jacob Ian Matthews' },
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
