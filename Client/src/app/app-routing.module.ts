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
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
// import { LoginComponent } from "./views/auth/login/login.component";
// import { RegisterComponent } from "./views/auth/register/register.component";

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
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "mapstest", component: MapExampleComponent},
  {path: "reset-password", component: ResetPasswordComponent},
  {path: "new-password/:code/:email", component: NewPasswordComponent},
  {path: "code-verify/:email", component: CodeVerifyComponent},
  {path: "dashboard", component: DashboardComponent },
  {path: "productdetails/:postId", component: SettingsComponent },
  {path: "emailcomfirmed", component: EmailConfirmSucceededComponent },
  {path: "404error", component: PageNotFoundComponent },
  {path: "product", component: SettingsComponent },


  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      // { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ]
  },
  {
    path:"posting",
    component: PostingComponent
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
