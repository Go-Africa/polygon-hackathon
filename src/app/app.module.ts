// import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';
import { SharedModule } from './shared/shared.module';
import { WebModule } from './feature/web/web.module';
import { NgModule } from '@angular/core';
import { ProjectService } from './shared/services/project.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadFileService } from './shared/services/upload-file.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './feature/user/user.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPaginationModule,

    SharedModule,
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    UploadFileService,
    ProjectService,
    // CircleProgressOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
