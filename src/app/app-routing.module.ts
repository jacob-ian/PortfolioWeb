import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './blog/post/post.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { AuthService } from './core/services/auth.service';
import { LoginGuard } from './core/guards/login.guard';
import { RegisteredGuard } from './core/guards/registered.guard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home | Jacob Ian Matthews',
      description:
        "The home of Jacob's Blog and the Development Portfolio of Jacob Ian Matthews.",
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: {
      title: "Jacob's Blog",
      description:
        'A blog about software development, personal finance, science, and everything else I enjoy writing about!',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
    children: [
      {
        path: ':name',
        component: PostComponent,
      },
    ],
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Contact Me | Jacob Ian Matthews',
      description:
        'Get in touch with Jacob Ian Matthews for your software projects, or just for a chat.',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    data: {
      title: 'Portfolio | Jacob Ian Matthews',
      description:
        'See the projects that Jacob Ian Matthews has worked on and completed.',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    data: {
      title: 'Log In | Jacob Ian Matthews',
      description: 'Log in to jacobianmatthews.com.',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RegisteredGuard], // Lock to users that are registered
    data: {
      title: 'Dashboard | Jacob Ian Matthews',
      description: 'Access your account information at jacobianmatthews.com.',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
    data: {
      title: 'Privacy Policy | Jacob Ian Matthews',
      description: 'The privacy policy for jacobianmatthews.com.',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: 'terms',
    component: TermsConditionsComponent,
    data: {
      title: 'Terms and Conditions | Jacob Ian Matthews',
      description:
        'Get in touch with Jacob Ian Matthews for your software projects, or just for a chat.',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    component: RegisterComponent,
    data: {
      title: 'Register | Jacob Ian Matthews',
      description: 'Register an account at jacobianmatthews.com.',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: 'unsubscribe',
    component: UnsubscribeComponent,
    data: {
      title: 'Unsubscribe | Jacob Ian Matthews',
      description:
        'Unsubscribe an email address from the mailing list at jacobianmatthews.com.',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      title: 'Search | Jacob Ian Matthews',
      description: 'Search the posts on the blog.',
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: {
      title: 'Page Not Found | Jacob Ian Matthews',
      description: "The requested page couldn't be found.",
      og: {
        type: 'website',
        image: 'https://jacobianmatthews.com/assets/icons/icon-512x512.png',
      },
    },
  },

  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
