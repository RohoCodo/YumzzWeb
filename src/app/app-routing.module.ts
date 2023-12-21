import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodWastePageComponent } from './foodwaste-page/foodwaste.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FileUploadComponent } from './statistics-page/statistics-page.component';
import {SignInAdminPageComponent} from './admin-sign-in-page/admin-sign-in-page.component';
import {SignUpAdminPageComponent} from './admin-sign-up-page/admin-sign-up-page.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent},
  { path:'foodwaste', component: FoodWastePageComponent },
  { path:'admin-fileupload', component: FileUploadComponent},
  {path:'privacy', component: PrivacyPolicyComponent},
  {path: 'admin', component: SignInAdminPageComponent},
  {path: 'admin-signup', component: SignUpAdminPageComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
