import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageDepartementComponent } from './manage-departement/manage-departement.component';
import { AffectUserToDepComponent } from './affect-user-to-dep/affect-user-to-dep.component';
import { UserByDepComponent } from './user-by-dep/user-by-dep.component';
import {FilterPipe} from './manage-users/filter.pipe';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    UpdateUserComponent,
    ManageUsersComponent,
    ManageDepartementComponent,
    AffectUserToDepComponent,
    UserByDepComponent,
    FilterPipe,
    DashboardAdminComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
