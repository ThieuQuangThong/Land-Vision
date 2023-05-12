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
import {MatDialogModule} from '@angular/material/dialog'


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
import { ProductDetailComponent } from "./views/admin/product-detail/product-detail.component";
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
import { ImageCropperModule } from 'ngx-image-cropper';
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
import { TranferVipPipe } from './_pipes/tranfer-vip.pipe';
import { AuthTokenInterceptor } from './_helper/http.interceptor';
import { AuthGuard } from './_helper/http.guard';
import { MapListDetailComponent } from './components/maps/map-list-detail/map-list-detail.component';
import { SuccessPaymentComponent } from './components/success-payment/success-payment.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CardAccountTableComponent } from './components/cards/card-account-table/card-account-table.component';
import { CardRevenueTableComponent } from './components/cards/card-revenue-table/card-revenue-table.component';
import { CardPackageTableComponent } from './components/cards/card-package-table/card-package-table.component';
import { UpdatePostingComponent } from './views/update-posting/update-posting.component';
import { EditMapListDetailComponent } from './components/maps/edit-map-list-detail/edit-map-list-detail.component';
import { PricingDialogComponent } from './components/pricing-dialog/pricing-dialog.component';
import { TranformTransactionTypePipe } from './_pipes/tranform-transaction-type.pipe';
import { CardApproveTableComponent } from './components/cards/card-approve-table/card-approve-table.component';
import { ApproveDetailComponent } from './views/admin/approve-detail/approve-detail.component';
import { CardPackageDetailComponent } from './components/cards/card-package-detail/card-package-detail.component';
import { CardAccountDetailComponent } from './components/cards/card-account-detail/card-account-detail.component';
import { EditProfilePopupComponent } from './components/edit-profile-popup/edit-profile-popup.component';
import { NgxEchartsModule } from 'ngx-echarts';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
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
    ProductDetailComponent,
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
    StopPropagationDirectiveService,
    MapListDetailComponent,
    SuccessPaymentComponent,
    CardAccountTableComponent,
    CardRevenueTableComponent,
    CardPackageTableComponent,
    UpdatePostingComponent,
    EditMapListDetailComponent,
    PricingDialogComponent,
    TranformTransactionTypePipe,
    CardApproveTableComponent,
    ApproveDetailComponent,
    CardPackageDetailComponent,
    CardAccountDetailComponent,
    EditProfilePopupComponent,
    // LoginComponent,
    // RegisterComponent,
  ],
  imports: [
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    MatDialogModule,
    ClipboardModule,
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
    ImageCropperModule,
    ReactiveFormsModule,
    NgxOtpInputModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey : 'AIzaSyDomFYPpQGSvKFE02VovMc-PaqcZ1KCAzE'
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
    MoneyTranformPipe

  ],
  bootstrap: [AppComponent],
  exports: [
    MoneyTranformPipe,
    DirectionTransformPipe,
    JuridicalTransformPipe,
    InteriorTransformPipe,
    DistanceTransferPipe,
    TranferVipPipe,
    TranformTransactionTypePipe,
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
