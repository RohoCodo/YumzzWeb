import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodWastePageComponent } from './foodwaste-page/foodwaste.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';
import {SignInAdminPageComponent} from './admin-sign-in-page/admin-sign-in-page.component';
import {SignUpAdminPageComponent} from './admin-sign-up-page/admin-sign-up-page.component';
import { ForgotPasswordPageComponent } from './admin-forgot-password/admin-forgot-password-page.component';
import {AdminHomePageComponent} from './admin-homepage/admin-homepage.component';
import {AdminRecipesComponent} from './admin-recipes/admin-recipes.component';


const routes: Routes = [
  { path: 'home', component: HomepageComponent},
  { path:'foodwaste', component: FoodWastePageComponent },
  { path:'admin-fileupload', component: FileUploadPageComponent},
  {path:'privacy', component: PrivacyPolicyComponent},
  {path: 'admin-signin', component: SignInAdminPageComponent},
  {path: 'admin-signup', component: SignUpAdminPageComponent},
  {path: 'admin-forgotPassword', component: ForgotPasswordPageComponent},
  {path: 'admin-homepage', component: AdminHomePageComponent},
  {path : 'admin-recipes', component: AdminRecipesComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
