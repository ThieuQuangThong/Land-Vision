import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Angular material
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
// import { LoginComponent } from "./views/auth/login/login.component";
// import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts
import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StorageService } from '../app/_service/storage.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CodeVerifyComponent } from './code-verify/code-verify.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AlertComponent } from './components/alert/alert.component';
import {NgbModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PostingComponent } from './views/posting/posting.component';
import { NgxLoadingModule } from "ngx-loading";
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MoneyTranformPipe } from './_pipes/money-tranform.pipe';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { DateFormatPipe } from './_pipes/date-format.pipe';
import { PricingCardComponent } from './components/pricing-card/pricing-card.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgmCoreModule } from '@agm/core';
import {IvyCarouselModule} from 'carousel-angular';
import { EmailConfirmSucceededComponent } from './views/email-confirm-succeeded/email-confirm-succeeded.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { NgxOtpInputModule } from "ngx-otp-input";
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DirectionTransformPipe } from './_pipes/direction-transform.pipe';
import { JuridicalTransformPipe } from './_pipes/juridical-transform.pipe';
import { InteriorTransformPipe } from './_pipes/interior-transform.pipe';
import { RelativeBuildingTabComponent } from './components/relative-building-tab/relative-building-tab.component';
import { DistanceTransferPipe } from './_pipes/distance-transfer.pipe';
import { PostImageComponent } from './components/post-image/post-image.component';
import { StopPropagationDirectiveService } from './_service/stopPropagationDirectiveService';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ProductDetailComponent,
    CardSettingsComponent,
    CardBarChartComponent,
    LoginComponent,
    SignupComponent,
    SingleProductComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    ResetPasswordComponent,
    CodeVerifyComponent,
    NewPasswordComponent,
    ProductListComponent,
    AlertComponent,
    PostingComponent,
    FileUploadComponent,
    MoneyTranformPipe,
    LoadingComponent,
    DateFormatPipe,
    PricingCardComponent,
    EmailConfirmSucceededComponent,
    PageNotFoundComponent,
    DirectionTransformPipe,
    JuridicalTransformPipe,
    InteriorTransformPipe,
    RelativeBuildingTabComponent,
    DistanceTransferPipe,
    TranferVipPipe,
    PostImageComponent,
    StopPropagationDirectiveService
    // LoginComponent,
    // RegisterComponent,
  ],
  imports: [
    MatTooltipModule,
    MatSortModule,
    IvyCarouselModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTabsModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    NgbAlertModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxOtpInputModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyAxofJGDu4RCNoGXCcdmXj8o4WL7j5vZj0'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    NgxLoadingModule.forRoot({}),
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide:JWT_OPTIONS,
        useFactory: jwtOptionsFactor,
        deps:[StorageService]
      }
    }),
  ],
  providers:
  [
    {  provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    [AuthGuard],

  ],
  bootstrap: [AppComponent],
  exports: [
    MoneyTranformPipe,
    DirectionTransformPipe,
    JuridicalTransformPipe,
    InteriorTransformPipe,
    DistanceTransferPipe,
    TranferVipPipe,
  ]

})

export class AppModule { }
export function jwtOptionsFactor(storage:StorageService){
  return {
     tokenGetter:() => {
       return storage.getAccessToken();
     },
    allowedDomains:["https://localhost:7165"],
    disallowedRoutes:[
      "https://localhost:7165/api/Authorization/Login",
      "https://localhost:7165/api/Token/Refresh"
    ],
    skipWhenExpired: false,
  }
}
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
