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
import { PROPERTY_INFOR } from 'src/assets/common/propertyInfor';
import { CodeVerifyComponent } from './code-verify/code-verify.component';
import { CardAccountTableComponent } from './components/cards/card-account-table/card-account-table.component';
import { CardApproveTableComponent } from './components/cards/card-approve-table/card-approve-table.component';
import { CardPackageDetailComponent } from './components/cards/card-package-detail/card-package-detail.component';
import { CardPackageTableComponent } from './components/cards/card-package-table/card-package-table.component';
import { CardRevenueTableComponent } from './components/cards/card-revenue-table/card-revenue-table.component';
import { MapExampleComponent } from './components/maps/map-example/map-example.component';
import { PricingDialogComponent } from './components/pricing-dialog/pricing-dialog.component';
import { SuccessPaymentComponent } from './components/success-payment/success-payment.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ApproveDetailComponent } from './views/admin/approve-detail/approve-detail.component';
import { EmailConfirmSucceededComponent } from './views/email-confirm-succeeded/email-confirm-succeeded.component';
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { PostingComponent } from './views/posting/posting.component';
import { ProfileComponent } from "./views/profile/profile.component";
import { UpdatePostingComponent } from './views/update-posting/update-posting.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full'},
  {
    path: "landing", component: LandingComponent,
  },
  {
    path: "login", component: LoginComponent,

    data: { requiredAuth: true },

  },
  {
    path: "signup", component: SignupComponent,
    data: {
      requiredAuth: false
    },
  },
  {
    path: "mapstestExample", component: MapExampleComponent,
    data: {
      requiredAuth: false,
      requiredRole: PROPERTY_INFOR.Role.UserAndAdmin
    }
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
      requiredAuth: false,
      requiredRole: PROPERTY_INFOR.Role.UserAndAdmin
    },
    canActivate: [AuthGuard]
  },
  {
    path: "reset-password", component: ResetPasswordComponent,
    data: {
      requiredAuth: false
    },
  },
  {
    path: "new-password/:code/:email", component: NewPasswordComponent,
    data: {
      requiredAuth: false
    },
  },
  {
    path: "code-verify/:email", component: CodeVerifyComponent,
    data: {
      requiredAuth: false
    },
  },
  {
    path: "dashboard", component: DashboardComponent,
    data: {
      requiredAuth: false,
    },
    canActivate: [AuthGuard]
  },
  {
    path: "productdetails/:postId", component: ProductDetailComponent,
    data: {
      requiredAuth: false,
    }
  },
  {
    path: "update-posting/:postId", component: UpdatePostingComponent,
    data: {
      requiredAuth: false,
      requiredRole: PROPERTY_INFOR.Role.UserAndAdmin
    },
    canActivate: [AuthGuard]
  },
  {
    path: "emailcomfirmed", component: EmailConfirmSucceededComponent,
    data: {
      requiredAuth: false
    },
  },
  {
    path: "404error", component: PageNotFoundComponent,
    data: {
      requiredAuth: false
    },
  },

  // admin views
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data:{
      requiredRole: PROPERTY_INFOR.Role.admin
    },
    children: [
      {
        path: "dashboard", component: DashboardComponent,
        data: {
          requiredAuth: false,
          requiredRole: PROPERTY_INFOR.Role.admin
        },
        canActivate: [AuthGuard]
      },
      { path: "tables", component: TablesComponent,
      data:{
        requiredRole: PROPERTY_INFOR.Role.admin
      },
      canActivate: [AuthGuard]
     },
      { path: "maps", component: MapsComponent ,
      data:{
        requiredRole: PROPERTY_INFOR.Role.admin
      },
      canActivate: [AuthGuard]},
      { path: "accountTables", component: CardAccountTableComponent,
      data:{
        requiredRole: PROPERTY_INFOR.Role.admin
      },
      canActivate: [AuthGuard] },
      { path: "revenueTables", component: CardRevenueTableComponent ,
      data:{
        requiredRole: PROPERTY_INFOR.Role.admin
      },
      canActivate: [AuthGuard]},
      { path: "packageTables", component: CardPackageTableComponent ,
      data:{
        requiredRole: PROPERTY_INFOR.Role.admin
      },

      canActivate: [AuthGuard]},
      {
        path: "packageDetails/:postId", component: CardPackageDetailComponent,
        data: {
          requiredAuth: PROPERTY_INFOR.Role.admin
        },
        canActivate: [AuthGuard]},
      { path: "approveTables", component: CardApproveTableComponent,
      data:{
        requiredRole: PROPERTY_INFOR.Role.admin
      } ,
      canActivate: [AuthGuard]},
      {
        path: "approveDetail/:postId", component: ApproveDetailComponent,
        data:{
          requiredRole: PROPERTY_INFOR.Role.admin
        },
        canActivate: [AuthGuard]
      },
      {
        path: "productdetails/:postId", component: ProductDetailComponent,
        data:{
          requiredRole: PROPERTY_INFOR.Role.admin
        },
        canActivate: [AuthGuard]
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
    path: "profile/:userId", component: ProfileComponent,
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
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
