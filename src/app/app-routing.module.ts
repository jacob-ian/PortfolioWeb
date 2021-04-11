import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PrivacyComponent } from './privacy/privacy.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home | Jacob Ian Matthews',
      meta: [
        {
          name: 'description',
          content: 'The home page of Jacob the software engineer!',
        },
      ],
      og: [
        {
          name: 'image',
          content: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
        },
        {
          name: 'type',
          content: 'website',
        },
        {
          name: 'url',
          content: 'https://jacobianmatthews.com',
        },
        { name: 'title', content: 'Home | Jacob Ian Matthews' },
      ],
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About Me | Jacob Ian Matthews',
      meta: [{ name: 'description', content: 'Who am I?' }],
      og: [
        {
          name: 'image',
          content: 'https://jacobianmatthews.com/assets/res/profile.jpeg',
        },
        {
          name: 'type',
          content: 'profile',
        },
        {
          name: 'profile:first_name',
          content: 'Jacob',
        },
        {
          name: 'profile:last_name',
          content: 'Matthews',
        },
        { name: 'profile:username', content: 'jacob-ian' },
        { name: 'profile:gender', content: 'male' },
        {
          name: 'url',
          content: 'https://jacobianmatthews.com/about',
        },
        { name: 'title', content: 'About Me | Jacob Ian Matthews' },
      ],
    },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      title: 'Projects | Jacob Ian Matthews',
      meta: [{ name: 'description', content: 'What have I been up to?' }],
      og: [
        {
          name: 'image',
          content: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
        },
        {
          name: 'type',
          content: 'website',
        },
        {
          name: 'url',
          content: 'https://jacobianmatthews.com/projects',
        },
        { name: 'title', content: 'Projects | Jacob Ian Matthews' },
      ],
    },
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: {
      title: 'Privacy Policy | Jacob Ian Matthews',
      meta: [
        {
          name: 'description',
          content: 'The Privacy Policy for jacobianmatthews.com',
        },
      ],
      og: [
        {
          name: 'image',
          content: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
        },
        {
          name: 'type',
          content: 'website',
        },
        {
          name: 'url',
          content: 'https://jacobianmatthews.com/privacy',
        },
        { name: 'title', content: 'Privacy Policy | Jacob Ian Matthews' },
      ],
    },
  },

  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Page Not Found | Jacob Ian Matthews',
      meta: [{ name: 'description', content: 'The page could not be found.' }],
      og: [
        {
          name: 'image',
          content: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
        },
        {
          name: 'type',
          content: 'website',
        },
        {
          name: 'url',
          content: 'https://jacobianmatthews.com/404',
        },
        { name: 'title', content: 'Page Not Found | Jacob Ian Matthews' },
      ],
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
