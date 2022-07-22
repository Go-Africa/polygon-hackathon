import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollspyDirective } from './tools/directives/scrollspy.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CountToModule } from 'angular-count-to';
import { NgxMasonryModule } from 'ngx-masonry';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxTypedJsModule } from 'ngx-typed-js';
// import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { ToastrModule } from 'ngx-toastr';
import { SwitcherComponent } from './tools/components/switcher/switcher.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { AngularFileUploaderModule } from 'angular-file-uploader';
import { NgxPaginationModule } from 'ngx-pagination';
// import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';
import { NgxLoadersModule } from '@ngx-lite/loaders';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartsModule } from 'ng2-charts';
import { NgxStripeModule } from 'ngx-stripe';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { NgxSelectModule } from 'ngx-select-ex';
import { NgSkeletonModule } from 'ng-skeleton';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { UiSwitchModule } from 'ngx-ui-switch';



@NgModule({
  declarations: [
    ScrollspyDirective,
    SwitcherComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    ScrollToModule.forRoot(),
    FlatpickrModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule,
    NgxPaginationModule,
    NgxTypedJsModule,
    // PaginationModule.forRoot(),
    NgxStripeModule.forRoot('pk_live_51JMVzVGxZntdxTfZSTLJ14jWhubktKKlnSUHdidQy00quC9LpwTxFFdJFEonI7oBBRg9bfZKu4Mdiy5nOeWqlYQT006t8VpZ5R'),
    // NgxStripeModule.forRoot('pk_test_51JMVzVGxZntdxTfZhyaEPCa6qbVXMUGjTOFSeP3MwZMtKa9eYX84lzB0Ib1zN9AdVsDO85Hr0C3JU8KRidjhShXp00EsuXcLjf'),
    // NgxSkeletonLoaderModule.forRoot(),
    NgxIntlTelInputModule,
    UiSwitchModule.forRoot({
      size: 'small',
      color: 'rgb(0, 189, 99)',
      switchColor: '#253649',
      defaultBoColor: 'transparent',
      checkedLabel: '',
      uncheckedLabel: ''
    }),
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollspyDirective,
    CarouselModule,
    // NgxYoutubePlayerModule,
    NgbModule,
    NgbNavModule,
    SwiperModule,
    NgxTypedJsModule,
    CountToModule,
    HttpClientModule,
    NgxMasonryModule,
    NgxSpinnerModule,
    FeatherModule,
    ScrollToModule,
    FlatpickrModule,
    ToastrModule,
    NgxDatatableModule,
    SwitcherComponent,
    // AngularFileUploaderModule,
    NgxPaginationModule,

    // PaginationModule,
    NgxLoadersModule,
    // Ng2SearchPipeModule,
    ChartsModule,
    NgxStripeModule,
    // NgxSkeletonLoaderModule,
    // NgxSelectModule,
    NgSkeletonModule,
    SelectDropDownModule,
    ClipboardModule,
    NgxIntlTelInputModule,
    UiSwitchModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
