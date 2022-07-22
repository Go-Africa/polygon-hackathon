/* TO DO */
/* Remove the comment from innerGuard on All-projects*/
import { ProjectDetailsComponent } from './feature/web/pages/project-details/project-details.component';
import { AllProjectsComponent } from './feature/web/pages/all-projects/all-projects.component';
import { ContactComponent } from './feature/web/pages/contact/contact.component';
import { InnerGuard } from './core/inner.guard';
import { GuardGuard } from './core/guard.guard';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { UserComponent } from './feature/user/user.component';
import { WebComponent } from './feature/web/web.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInvestmentComponent } from './feature/user/pages/user-investment/user-investment.component';
import { UserPreferenceComponent } from './feature/user/pages/user-preference/user-preference.component';
import { UserProfileeComponent } from './feature/user/pages/user-profile/user-profile.component';
import { UserProjectsComponent } from './feature/user/pages/user-projects/user-projects.component';
import { UserSettingComponent } from './feature/user/pages/user-setting/user-setting.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { HomeComponent } from './feature/web/pages/home/home.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { FormProjectComponent } from './feature/user/tools/components/form-project/form-project.component';
import { AboutComponent } from './feature/web/pages/about/about.component';
import { PrivacyPolicyComponent } from './feature/web/pages/privacy-policy/privacy-policy.component';
import { ValidGuard } from './core/valid.guard';
import { ActivateAccountComponent } from './auth/pages/activate-account/activate-account.component';

const routes: Routes = [
  {
    path: '',
    component: WebComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'submit-project',
        component: FormProjectComponent
      },
      {
        path: 'all-projects',
        canActivate: [InnerGuard],
        component: AllProjectsComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'privacy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'projects/:id/details',
        canActivate: [InnerGuard],
        component: ProjectDetailsComponent
      },
      {
        path: 'me',
        canActivate: [InnerGuard],
        component: UserComponent,
        children: [
          {
            path: '',
            component: UserProfileeComponent
          },
          {
            path: 'settings',
            component: UserSettingComponent
          },
          {
            path: 'my-projects',
            component: UserProjectsComponent
          },
          {
            path: 'investments',
            component: UserInvestmentComponent
          },
          {
            path: 'preferences',
            component: UserPreferenceComponent
          },
        ]
      },
    ]
  },
  {
    path: 'login',
    canActivate: [GuardGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [GuardGuard],
    component: RegisterComponent
  },
  {
    path: 'forgot-password',
    canActivate: [GuardGuard],
    component: ForgotPasswordComponent
  },
  {
    path: 'activate-account/:token',
    //canActivate: [ValidGuard],
    canActivate: [GuardGuard],
    component: ActivateAccountComponent
  },
  {
    path: '**',
    // redirectTo: 'verify',
    // pathMatch: 'full'
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
