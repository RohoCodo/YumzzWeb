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
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { ForgotPasswordPageComponent } from './admin-forgot-password/admin-forgot-password-page.component';
import { AdminHomePageComponent } from './admin-homepage/admin-homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { FileService } from './services/file.service';
import { FileOperationComponent } from './components/file-operation/file-operation.component';
import {AdminRecipesComponent} from './admin-recipes/admin-recipes.component';
import {FormsModule} from '@angular/forms';
import { FileUploadPageComponent } from './file-upload-page/file-upload-page.component';
// import { WasmService } from './services/wasm.service';
// import { FileUploadService } from './services/file-upload.service';
// import { FileUploadComponent } from './components/file-operation/file-operation.component';




@NgModule({
  declarations: [AppComponent, FileUploadPageComponent, FoodWastePageComponent, HomepageComponent, PrivacyPolicyComponent, SignInAdminPageComponent, SignUpAdminPageComponent, ForgotPasswordPageComponent, AdminHomePageComponent, AdminRecipesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
  ],
  providers: [AngularFirestore, FileOperationComponent, FileService],
  bootstrap: [AppComponent],
})
export class AppModule {}
