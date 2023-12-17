import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodWastePageComponent } from './foodwaste-page/foodwaste.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { StatisticsPageComponent } from './statistics-page/statistics-page.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent},
  { path:'foodwaste', component: FoodWastePageComponent },
  { path:'privacy', component: PrivacyPolicyComponent},
  { path:'admin', component: StatisticsPageComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
