import { NotFoundComponent } from '../../shared/pages/not-found/not-found.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { WebComponent } from './web.component';
import { CategorieComponent } from './tools/components/homepage/categorie/categorie.component';
import { HowItWorksComponent } from './tools/components/homepage/how-it-works/how-it-works.component';
import { NavbarComponent } from './tools/components/web/navbar/navbar.component';
import { InvestOpportunitiesComponent } from './tools/components/homepage/invest-opportunities/invest-opportunities.component';
import { CallInvestComponent } from './tools/components/homepage/call-invest/call-invest.component';
import { PartnerComponent } from './tools/components/homepage/partner/partner.component';
import { AboutComponent } from './pages/about/about.component';
import { FooterComponent } from './tools/components/web/footer/footer.component';
import { HeaderComponent } from './tools/components/homepage/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { SkeletonLoadingDataComponent } from './tools/components/web/skeleton-loading-data/skeleton-loading-data.component';
import { DefaultCurrencyComponent } from './tools/components/web/default-currency/default-currency.component';
import { ProjectImageGalleryComponent } from './tools/components/web/project-image-gallery/project-image-gallery.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PlyrModule } from 'ngx-plyr';
import { ProjectCommentsComponent } from './pages/project-details/project-comments/project-comments.component';
import { ProjectLikesComponent } from './pages/project-details/project-likes/project-likes.component';


@NgModule({
  declarations: [
    WebComponent,
    FooterComponent,
    CategorieComponent,
    HowItWorksComponent,
    NavbarComponent,
    HeaderComponent,
    HomeComponent,
    InvestOpportunitiesComponent,
    CallInvestComponent,
    PartnerComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent,
    ProjectDetailsComponent,
    AllProjectsComponent,
    PrivacyPolicyComponent,
    SkeletonLoadingDataComponent,
    DefaultCurrencyComponent,
    ProjectImageGalleryComponent,
    ProjectCommentsComponent,
    ProjectLikesComponent
  ],
  imports: [
    SharedModule,
    NgxGalleryModule,
    PlyrModule,
  ],
  exports: [
  ],
})
export class WebModule { }
