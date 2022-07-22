import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { UserProfileeComponent } from './pages/user-profile/user-profile.component';
import { UserSettingComponent } from './pages/user-setting/user-setting.component';
import { UserInvestmentComponent } from './pages/user-investment/user-investment.component';
import { UserPreferenceComponent } from './pages/user-preference/user-preference.component';
import { UserProjectsComponent } from './pages/user-projects/user-projects.component';
import { FormProjectComponent } from './tools/components/form-project/form-project.component';


@NgModule({
  declarations: [
    UserComponent,
    UserProfileeComponent,
    UserSettingComponent,
    UserInvestmentComponent,
    UserPreferenceComponent,
    UserProjectsComponent,
    FormProjectComponent,
  ],
  imports: [
    SharedModule
  ]
})
export class UserModule { }
