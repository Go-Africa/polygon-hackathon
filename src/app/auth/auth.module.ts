import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
// import { NgCircleProgressModule } from 'ng-circle-progress';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent, ActivateAccountComponent],
  imports: [
    SharedModule,

    // NgCircleProgressModule.forRoot({
    //   backgroundOpacity: 0.8,
    //   backgroundStrokeWidth: 4,
    //   backgroundPadding: -9,
    //   radius: 60,
    //   space: -5,
    //   toFixed: 1,
    //   maxPercent: 1000,
    //   outerStrokeWidth: 1,
    //   innerStrokeWidth: 12,
    //   imageHeight: 70,
    //   imageWidth: 116,
    //   animateTitle: false,
    //   animationDuration: 800,
    //   showTitle: false,
    //   showSubtitle: false,
    //   showUnits: false,
    //   showInnerStroke: false
    // }),
  ],
  providers: [
  ]
})
export class AuthModule { }
