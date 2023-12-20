import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodWastePageComponent } from './foodwaste-page/foodwaste.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import {SignInAdminPageComponent} from './admin-sign-in-page/admin-sign-in-page.component';
import {SignUpAdminPageComponent} from './admin-sign-up-page/admin-sign-up-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, FoodWastePageComponent, HomepageComponent, PrivacyPolicyComponent, SignInAdminPageComponent, SignUpAdminPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
