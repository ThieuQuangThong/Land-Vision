import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', },
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
    path: "mapstest", component: MapExampleComponent,
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
