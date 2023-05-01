import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { ProductDetailComponent } from "./views/admin/product-detail/product-detail.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
// import { LoginComponent } from "./views/auth/login/login.component";
// import { RegisterComponent } from "./views/auth/register/register.component";
import { AuthGuard } from './_helper/http.guard';

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MapExampleComponent } from './components/maps/map-example/map-example.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { CodeVerifyComponent } from './code-verify/code-verify.component';
import { PostingComponent } from './views/posting/posting.component';
import { EmailConfirmSucceededComponent } from './views/email-confirm-succeeded/email-confirm-succeeded.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { SuccessPaymentComponent } from './components/success-payment/success-payment.component';
import { CardAccountTableComponent } from './components/cards/card-account-table/card-account-table.component';
import { CardRevenueTableComponent } from './components/cards/card-revenue-table/card-revenue-table.component';
import { CardPackageTableComponent } from './components/cards/card-package-table/card-package-table.component';
import { UpdatePostingComponent } from './views/update-posting/update-posting.component';
import { PricingDialogComponent } from './components/pricing-dialog/pricing-dialog.component';
import { CardApproveTableComponent } from './components/cards/card-approve-table/card-approve-table.component';
import { ApproveDetailComponent } from './views/admin/approve-detail/approve-detail.component';
import { AuthGuard2 } from './_helper/guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full', },
  {
    path: "login", component: LoginComponent,

    data: { requỉedAuth: true },
    canActivate: [AuthGuard]

  },
  {
    path: "signup", component: SignupComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "mapstestExample", component: MapExampleComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "posting", component: PostingComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "pricing", component: PricingDialogComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "reset-password", component: ResetPasswordComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "new-password/:code/:email", component: NewPasswordComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "code-verify/:email", component: CodeVerifyComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard", component: DashboardComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "productdetails/:postId", component: ProductDetailComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "update-posting/:postId", component: UpdatePostingComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "emailcomfirmed", component: EmailConfirmSucceededComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "404error", component: PageNotFoundComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "product", component: ProductDetailComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },


  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "dashboard", component: DashboardComponent,
        data: {
          requiredAuth: false
        },
        canActivate: [AuthGuard]
      },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "accountTables", component: CardAccountTableComponent },
      { path: "revenueTables", component: CardRevenueTableComponent },
      { path: "packageTables", component: CardPackageTableComponent },
      { path: "approveTables", component: CardApproveTableComponent },
      {
        path: "approveDetail/:postId", component: ApproveDetailComponent
      },

      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ]
  },
  {
    path: "posting", component: PostingComponent,

    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]

  },
  // no layout views
  {
    path: "profile", component: ProfileComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: "landing", component: LandingComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: "successPayment", component: SuccessPaymentComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: "successPayment", component: SuccessPaymentComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthGuard]
  },
  {
    path: "", component: IndexComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
